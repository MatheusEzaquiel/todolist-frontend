import styles from './Task.module.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoChevronDown } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import { TaskService } from "./../../services/api/tasks/taskService"
import { Modal } from '../modal/Modal';


export const Task = ({ taskData, checklistData, isArchived }) => {

    let arrayTasksDone = [];

    taskData.map((task) => {
        arrayTasksDone.push(task.done)
    })

    const navigate = useNavigate();

    const [checkboxStates, setCheckboxStates] = useState(arrayTasksDone)

    const [isOpen, setIsOpen] = useState(false)
    
    const [confirmDelete, setConfirmDelete] = useState([])


    const handleCheckboxChange = (index) => {
        const updatedCheckboxStates = [...checkboxStates]
        updatedCheckboxStates[index] = !updatedCheckboxStates[index]
        setCheckboxStates(updatedCheckboxStates)
    };

    const checkTasks = (taskId, index) => {
        updateTask(taskId, checkboxStates[index])
        console.log(checkboxStates)
    };

    
    const openModal = (selectedTask) => {

        setIsOpen(true)

        //console.log("1 - Modal Open")
        //console.log("2 - task id selected: " + selectedTask)

        setConfirmDelete([false, selectedTask])

    }

    const deleteTask = async(taskId) => {

        try {
                
            //console.log("4 - deleteTask() is called")
            //console.log("5 - task id in deleteTask: " + taskId)

            await TaskService.deleteById(taskId)
            
        } catch (ex) {
            console.log(ex.message)
        } finally {
            setIsOpen(false)
        }

    }

    const calcExpirationDate = (endDateString) => {
        
        const currentData = new Date()

        let endDateArr = endDateString.split("/")

        const endAtDate = new Date(endDateArr[0], endDateArr[1] -1 , endDateArr[2])

        const result = endAtDate - currentData;

        return Math.floor(result / (1000 * 60 * 60 * 24));

    }


    const colorPriority = (priority) => {

        if(isArchived) return "#636363";

        if(priority.toUpperCase() == "HIGH") return "#d90b1f";
        if(priority.toUpperCase() == "MEDIUM") return "#e3770b";
        if(priority.toUpperCase() == "LOW") return "#e3dc0b";
        if(priority.toUpperCase() == "NO") return "#8f8d8d";
        if(priority.toUpperCase() == "" || priority == null) return "#8f8d8d";

    }

    useEffect(() => { 

        /*console.log("3 - useEffect task called")
        console.log(" VERIFY confirmDelete enabled " + confirmDelete[0])
        console.log(" VERIFY confirmDelete taskId " + confirmDelete[1])*/

        if(isOpen) {

            let lists = document.getElementsByName("collapseActions")
            for (let i = 0; i < lists.length; i++) {
                lists[i].open = false
            }
        }

        if(confirmDelete[0]) {
            deleteTask(confirmDelete[1])

        }

    }, [confirmDelete])

    
    const updateTask = async(taskId, index) => {

        const dataToUpload = {
            done: !index
        }

        try {

            await TaskService.updateById(taskId, dataToUpload)
       
        } catch (ex) {
            console.log(ex.message)
        } finally {
            console.log("update done task")
        }

    }

    return (

        <>
           
            {taskData.map((task, index) => (

                <div className={styles.taskContainer} key={index}>

                    <div className={styles.taskText}>      
                        
                        
                        <input
                            type="checkbox"
                            name="taskToCheck"
                            id={`taskToCheck_${task.id}`}
                            className={"checkbox"}
                            value={task.id}
                            checked={checkboxStates[index]}
                            onChange={() => {
                                handleCheckboxChange(index)
                                checkTasks(task.id, index)
                            }}
                        />
                        <label htmlFor={`taskToCheck_${task.id}`} className={styles.switch}>
                            <span className={styles.slider}></span>
                        </label>

                            <input type="text" name="taskTitle" id="taskTitle" className={styles.taskTitle + " " + styles.truncate}  value={task.title} style={checkboxStates[index] ? {textDecoration: 'line-through'} : {}}/>
                        
                        <p className={styles.expireData}>{task?.endAtDate ? `Expire in ${calcExpirationDate(task?.endAtDate)} days` : ""}</p>

                    </div>

                    
                    {isArchived !== true ? (
                    
                        <details name="collapseActions" className={styles.collapseTask}>
                        <summary className={styles.title}><GoChevronDown /></summary>
                        
                            <button onClick={ () => { navigate(`/todolist-frontend/edit/${checklistData.id}/${task.id}`)} } className={styles.item + " " +styles.edit} style={{borderRadius: "10px 10px 0px 0px "}}>
                                <div className={styles.btnWithIcon}>
                                    <MdEdit /> <p>Edit</p>
                                </div>
                            </button>

                            <button onClick={ () => { openModal(task.id) } } className={styles.item + " " + styles.remove} style={{borderRadius: "0px 0px 10px 10px"}}>
                                <div className={styles.btnWithIcon}>
                                    <FaTrash /> <p>Remove</p>  
                                </div>
                            </button>
                        
                        </details>
                    
                    ) : null}
                    
                    
                    <div className={styles.priorityBar} style={{background: colorPriority(task.priority)}}></div>
                </div>

            ))}

            <Modal openModal={isOpen}  closeModal={() => { setIsOpen(false) }} confirmDelete={() => {
                let idTaskRemoved = confirmDelete.splice(1,2)
                setConfirmDelete([true, idTaskRemoved])
                }}>
                <p>Are you sure archive this task?</p>
            </Modal>
            
        </>
            
    );

}