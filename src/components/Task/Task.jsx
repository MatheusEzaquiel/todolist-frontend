import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoChevronDown } from "react-icons/go";
import { MdEdit, MdDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { TaskService } from "./../../services/api/tasks/taskService";
import { Modal } from '../modal/Modal';

export const Task = ({ taskData, checklistData, isArchived }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([...taskData].sort((a, b) => a.position - b.position));
  const [checkboxStates, setCheckboxStates] = useState(tasks.map(task => task.done));
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Estado do menu flutuante
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [openTaskId, setOpenTaskId] = useState(null);
  const menuRef = useRef(null);

  const saveTimeout = useRef(null);

  // 👉 Reordena a lista localmente e agenda o salvamento
  const handleDropTask = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const updatedTasks = [...tasks];
    const draggedItem = updatedTasks[draggedIndex];
    updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(dropIndex, 0, draggedItem);

    const reordered = updatedTasks.map((task, idx) => ({
      ...task,
      position: idx + 1,
    }));

    setTasks(reordered);
    setDraggedIndex(null);
    scheduleAutoSave(reordered);
  };

  // ⏱️ Aguarda 20s após o último movimento para salvar
  const scheduleAutoSave = useCallback((updatedTasks) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => handleAutoSaveOrder(updatedTasks), 20000);
  }, []);

  // 💾 Envia nova ordem ao backend
  const handleAutoSaveOrder = useCallback(async (updatedTasks) => {
    try {
      const ordered = [...updatedTasks].sort((a, b) => a.position - b.position);
      const orderedIds = ordered.map((t) => t.uuid || t.id);

      console.log("📦 Ordem enviada:", orderedIds);
      await TaskService.updateOrderTasks(checklistData.id, orderedIds);
      console.log("✅ Ordem salva automaticamente!");
    } catch (ex) {
      console.error("❌ Erro ao salvar ordem:", ex);
    }
  }, [checklistData.id]);

  const handleCheckboxChange = (index) => {
    const updated = [...checkboxStates];
    updated[index] = !updated[index];
    setCheckboxStates(updated);
  };

  const checkTasks = (taskId, index) => updateTask(taskId, checkboxStates[index]);

  const openModal = (selectedTask) => {
    setIsOpen(true);
    setConfirmDelete([false, selectedTask]);
  };

  // 🔹 Mostra menu flutuante (60px acima, 80px à direita)
  const openTaskOptions = (e, taskId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    //setMenuPos({ top: rect.top - 60, left: rect.left + 80 });
    setMenuPos({ top: rect.top - 60, left: rect.left + 80 });
    setOpenTaskId(taskId);
  };

  const deleteTask = async (taskId) => {
    try {
      await TaskService.deleteById(taskId);
      navigate(0);
    } catch (ex) {
      console.log(ex.message);
    } finally {
      setIsOpen(false);
    }
  };

  const calcExpirationDate = (endDateString) => {
    const current = new Date();
    const [year, month, day] = endDateString.split("/");
    const endAtDate = new Date(year, month - 1, day);
    return Math.floor((endAtDate - current) / (1000 * 60 * 60 * 24));
  };

  const colorPriority = (priority) => {
    if (isArchived) return "#636363";
    switch (priority?.toUpperCase()) {
      case "HIGH": return "#d90b1f";
      case "MEDIUM": return "#e3770b";
      case "LOW": return "#e3dc0b";
      default: return "#8f8d8d";
    }
  };

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenTaskId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const lists = document.getElementsByName("collapseActions");
      for (let i = 0; i < lists.length; i++) lists[i].open = false;
    }

    if (confirmDelete[0]) deleteTask(confirmDelete[1]);

    return () => clearTimeout(saveTimeout.current);
  }, [confirmDelete, isOpen]);

  const updateTask = async (taskId, index) => {
    const dataToUpload = { done: !index };
    try {
      await TaskService.updateById(taskId, dataToUpload);
    } catch {
      console.log("error to update task");
    }
  };

  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={() => setDraggedIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropTask(e, index)}
          onClick={(e) => openTaskOptions(e, task.id)}
          className="w-full h-32 border-b border-gray-200 bg-slate-50
            mb-4 p-2 rounded-2xl shadow-lg flex items-center justify-between relative"
        >
          <div className="w-4/5 flex items-start justify-start gap-2">
            <input
              type="checkbox"
              className="appearance-none min-w-[30px] min-h-[30px] border-2 border-orange rounded-full bg-white
                ml-2 checked:bg-green-3 checked:border-12 checked:border-green"
              checked={checkboxStates[index]}
              onChange={() => {
                handleCheckboxChange(index);
                checkTasks(task.id, index);
              }}
            />
            <input
              type="text"
              className="text-2xl bg-transparent outline-none text-wrap text-gray-5 truncate"
              value={task.title}
              style={checkboxStates[index] ? { textDecoration: 'line-through' } : {}}
              readOnly
            />
            <div className="flex items-center text-sm text-red font-bolder absolute bottom-2 left-6">
              {checkboxStates[index] ? (
                <>
                  <MdDone className="text-green" />
                  <p className="text-green">done!</p>
                </>
              ) : task?.endAtDate ? (
                <>
                  <IoWarningOutline color="red" />
                  <p className="text-red pl-1">
                    Expire in {calcExpirationDate(task?.endAtDate)} days
                  </p>
                </>
              ) : null}
            </div>
          </div>

          {/* ✅ Só mostra o menu da task clicada */}
          {openTaskId === task.id && (
            <div
              ref={menuRef}
              className="bg-white/20 backdrop-blur-xl p-3 rounded-xl shadow-lg flex flex-col
                border border-gray-200 z-60 transition-all duration-200"
              style={{ top: menuPos.top, left: menuPos.left }}>
              <button
                onClick={() => navigate(`/todolist-frontend/edit/${checklistData.id}/${task.id}`)}
                className="flex gap-2 items-center justify-center py-2 bg-green-300 hover:text-green-300 z-90"
              >
                <MdEdit size={"1.4rem"} />
                <p>Edit</p>
              </button>

              <button
                onClick={() => openModal(task.id)}
                className="flex gap-2 items-center justify-center py-2 hover:text-red-300">
                <FaTrash size={"1.2rem"} />
                <p>Remove</p>
              </button>
            </div>
          )}

          <div
            className="w-2 h-full absolute top-0 right-0"
            style={{ background: colorPriority(task.priority) }}
          ></div>
        </div>
      ))}

      <Modal
        openModal={isOpen}
        closeModal={() => setIsOpen(false)}
        confirmDelete={() => {
          let idTaskRemoved = confirmDelete.splice(1, 2);
          setConfirmDelete([true, idTaskRemoved]);
        }}
      >
        <p>Are you sure archive this task?</p>
      </Modal>
    </>
  );
};
