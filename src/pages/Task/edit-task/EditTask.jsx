import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


import styles from "./EditTask.module.css";

import { Notification } from "../../../components/notification/Notification";
import { TaskService } from "./../../../services/api/tasks/taskService"
import { TaskPriorityService } from "../../../services/api/taskPriority/TaskPriorityService";
import { ChecklistService } from "../../../services/api/checklists/ChecklistService";


export const EditTask = () => {

    const { taskId, checklistId } = useParams()

    const navigate = useNavigate()

    const [ task, setTask ] = useState(null)

    const [ title, setTitle] = useState("")
    const [ description, setDescription] = useState("")
    const [ priority, setPriority] = useState()

    const [ startAtDate, setStartAtDate] = useState("")
    const [ startAtTime, setStartAtTime] = useState("")

    const [ endAtDate, setEndAtDate] = useState("")
    const [ endAtTime, setEndAtTime] = useState("")

    const [checklistSelected, setChecklistSelected] = useState(null)

    const [priorities, setPriorities] = useState();

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""})

    const getTask = async() => {

        try {

            const res = await TaskService.getById(taskId)
            setTask(res)

        } catch (ex) {
            console.log(ex.message)
        }

    }

    const getAllPriorities = async() => {

        try {

            const res = await TaskPriorityService.list()
            res.sort()
            setPriorities(res);

        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
            setIsOpenNotification(true)
            console.error(ex.message)
        }

    }
    
    const getChecklist = async(checklistId) => {
        
        try {
            
            const res = await ChecklistService.getById(checklistId);

            setChecklistSelected(res);

        } catch (ex) {
           console.log("Error: " + ex.message)
        } 

    }

    useEffect(() => {
        
        getTask();
        getChecklist(checklistId);
        getAllPriorities();

    },[])

    

    const updateTask = async() => {

        const dataToUpload = {
            title: title,
            description: description,
            startAtDate: startAtDate,
            startAtTime: startAtTime,
            endAtDate: endAtDate,
            endAtTime: endAtTime,
            priority: priority
        }

       
        try {

            await TaskService.updateById(taskId, dataToUpload);

            setResultApi({status: "ok", message: "Task was edited!"})

            setTimeout( () => {
                navigate("/todolist-frontend/lists");
            }, 2000)
       
        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
            console.log(ex.message)
        } finally {
            setIsOpenNotification(true);
        }

    }

    const colorPriority = (priority) => {

        if(priority == "high") return "#d90b1f";
        if(priority == "medium") return "#e3770b";
        if(priority == "low") return "#e3dc0b";
        if(priority == "no") return "#8f8d8d";
        if(priority == "" || priority == null) return "#8f8d8d";

    }

    const blockFormRefresh = (e) => {
        e.preventDefault();
        updateTask();
    }

    return (

        <section className={styles.section}>

            <div className={styles.headerMenu}>
                <h1 className={styles.title}><h2>Edit this task from <span span style={{color: "#ed6f07"}}>{checklistSelected?.title ?? "no title"}</span></h2></h1>
            </div>
            
            <div className={styles.containerDefault}>
                <form onSubmit={blockFormRefresh} className={styles.formEditTask}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="titleTask">Title</label>
                        <input type="text" onChange={(event) => { setTitle(event.target.value) }} value={title} name="titleTask" id="titleTask" placeholder={task?.title ?? 'Title task'}/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="textTask">Description</label>
                        <textarea type="text" onChange={(event) => { setDescription(event.target.value) }} value={description} name="textTask" id="textTask" placeholder={task?.description ?? 'Description task'}></textarea>
                    </div>

                    <div className={styles.dateTimeBox}>

                        <div className={styles.inputGroupDateTime}>

                            <label htmlFor="startedAtTask">Start on Date <span>{task?.startAtDate ?? ''}</span></label>
                            <input type="date" className={styles.inputDateTime} onChange={(event) => { setStartAtDate(event.target.value) }}  value={startAtDate} name="startedAtTask" id="startedAtTask"/>

                        </div>

                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="startedAtTask">Start at time <span>{task?.startAtTime ?? ''}</span></label>
                            <input type="time"  className={styles.inputDateTime} onChange={(event) => { setStartAtTime(event.target.value) }} value={startAtTime} name="startedAtTask" id="startedAtTask"/>
                        </div>
                        
                    </div>

                    <div className={styles.dateTimeBox}>
                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="endAtTask">End on date <span>{task?.endAtDate ?? ''}</span></label>
                            <input type="date" className={styles.inputDateTime} onChange={(event) => { setEndAtDate(event.target.value) }} value={endAtDate} name="endAtTask" id="endAtTask"/>
                        </div>

                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="endAtTask">End at time <span>{task?.endAtTime ?? ''}</span></label>
                            <input type="time" className={styles.inputDateTime} onChange={(event) => { setEndAtTime(event.target.value) }} value={endAtTime} name="endAtTask" id="endAtTask"/>
                        </div>
                    </div>

                    <div className={styles.priorityBox}>

                        <div className={styles.priorityInputGroup}>
                            <label htmlFor="endAtTask">Current priority</label>
                            <div style={{color: colorPriority(priority == null ? task?.priority : priority)}}> 
                                <h4>{priority == null ? task?.priority : priority}</h4>
                            </div>
                        </div>

                        
                        <div className={styles.priorityInputGroup}>
                            <label htmlFor="endAtTask">Choose priority</label>
                            <select name="priorityTask" id="priorityTask" style={{background: colorPriority()}} className={styles.selectPriorityTask} onChange={(event) => { setPriority(event.target.value);}}>
                        
                                {   
                                    (priorities != null) ? (

                                        priorities.map((p) => {
                                            
                                            return <option key={p.id} value={p.priority} >{p.priority}</option>

                                        })
                                    ) : (

                                        <option value="NO">NO</option>

                                    )
                                }
                            </select>
                        </div>

                    </div>
                    
                    
                    <div className={styles.btnFlex}>
                        <Link to={"/todolist-frontend/lists"}>
                            <button className={styles.btnForm + " " + styles.btnBack}>Back</button>
                        </Link>
                        <button className={styles.btnForm + " " + styles.btnEdit}>update</button>
                    </div>
                    
                    <Notification
                        enabled={isOpenNotification}
                        close={() => setIsOpenNotification(false)}
                        element={{type: resultApi.type, message:resultApi.message}}>
                    </Notification>

                </form>
                
            </div>
        
        </section>
        
    )

}