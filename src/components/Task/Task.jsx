import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoChevronDown } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

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
            navigate(0)
        }

    }, [confirmDelete])

    
    const updateTask = async(taskId, index) => {

        const dataToUpload = {
            done: !index
        }

        try {

            await TaskService.updateById(taskId, dataToUpload)
       
        } catch (ex) {
            console.log("error to update task")
        }

    }

    return (

        <>
           
            {taskData.map((task, index) => (

                <div className="w-full h-32 border-b border-gray-300 p-2 flex items-center justify-between relative" key={index}>

                    <div className="w-4/5 flex items-center justify-between gap-2">      
                        
                        <input
                            type="checkbox"
                            name="taskToCheck"
                            id={`taskToCheck_${task.id}`}
                            className="appearance-none w-[40px] h-[31px] border-2 border-orange rounded-full bg-white ml-2 checked:bg-green-3 checked:border-12 checked:border-green"
                            value={task.id}
                            checked={checkboxStates[index]}
                            onChange={() => {
                                handleCheckboxChange(index)
                                checkTasks(task.id, index)
                            }}
                        />
                   

                        <input type="text" name="taskTitle" id="taskTitle" className="text-2xl bg-transparent outline-none text-wrap text-gray-5 truncate"  value={task.title} style={checkboxStates[index] ? {textDecoration: 'line-through'} : {}}/>
                        
                        
                        <div className="flex items-center text-sm text-red font-bolder absolute bottom-2 left-6">
                            { checkboxStates[index]
                                ?   <>
                                        <MdDone className="text-green"/>
                                        <p className="text-green">done!</p>
                                    </>
                                    
                                : task?.endAtDate
                                    ?   <>
                                            <IoWarningOutline color='red'/>
                                            <p className="text-red pl-1">Expire in {calcExpirationDate(task?.endAtDate)} days</p>
                                        </>
                                    : ""
                            }
                        </div>

                    </div>

                    
                    {isArchived !== true ? (
                    
                        <details name="collapseActions" className="w-32 h-1/2 p-2 absolute top-10 right-6">

                            <summary className="list-none w-full h-12 flex justify-end">
                                <GoChevronDown size={"40px"} className='-z-5'/>
                            </summary>

                            <div className="w-full h-32 absolute z-40">

                                <button onClick={ () => { navigate(`/todolist-frontend/edit/${checklistData.id}/${task.id}`)} } 
                                    className="w-full h-1/2 p-2 flex gap-2 items-center justify-center bg-white text-green hover:text-green font-semibold border border-gray-300">
                                        <MdEdit size={"1.5rem"}/>
                                        <p>Edit</p>
                                </button>

                                <button onClick={ () => { openModal(task.id) } }
                                    className="w-full h-1/2 p-2 flex gap-2 items-center justify-center bg-white text-red hover:text-green font-semibold border border-gray-300">

                                    <FaTrash size={"1.3rem"}/>
                                    <p>Remove</p>  

                                </button>
                            </div>
                                
                        
                        </details>
                    
                    ) : null}
                    
                    
                    <div className="w-2 h-full absolute top-0 right-0" style={{background: colorPriority(task.priority)}}></div>
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