import { Link, useParams } from "react-router-dom"

import { useState, useEffect } from "react"

import styles from "./CreateTask.module.css";

import { Notification } from "../../../components/notification/Notification";
import { ChecklistService } from "../../../services/api/checklists/ChecklistService";
import { TaskService } from "./../../../services/api/taskPriority/TaskPriorityService";
import { TaskPriorityService } from "../../../services/api/taskPriority/TaskPriorityService";

export const CreateTask = () => {

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""})

    const { checklistId } = useParams();

    const [ checklistSelected, setChecklistSelected ] = useState(null);

    const [ title, setTitle] = useState("");
    const [ description, setDescription] = useState("");
    const [ priority, setPriority] = useState("no");

    const [ startAtDate, setStartAtDate] = useState("");
    const [ startAtTime, setStartAtTime] = useState("");

    const [ endAtDate, setEndAtDate] = useState("");
    const [ endAtTime, setEndAtTime] = useState("");

    const [priorities, setPriorities] = useState();

    
    const getChecklist = async() => {

        try {
            
            const res = await ChecklistService.getById(checklistId);

            setChecklistSelected(res);

        } catch (ex) {
            console.log(ex.message)
        } 

    }

    const getAllPriorities = async() => {

        try {

            const res = await TaskPriorityService.list();
            setPriorities(res);
            
            setPriority(res[0].priority)

        } catch (ex) {
            console.log(ex.message)
        }

    }

    const colorPriority = (priority) => {

        if(priority == "high") return "#d90b1f";
        if(priority == "medium") return "#e3770b";
        if(priority == "low") return "#e3dc0b";
        if(priority == "no") return "#8f8d8d";
        if(priority == "" || priority == null) return "#8f8d8d";

    }
    

    //Create
    const createTask = async() => {
       
        const dataToCreate = {
            title: title,
            description: description,
            startAtDate: startAtDate,
            startAtTime: startAtTime,
            endAtDate: endAtDate,
            endAtTime: endAtTime,
            priority: priority,
            checklistId: checklistId
        }


        try {

            await TaskService.create(dataToCreate);
           
            setResultApi({status: "ok", message: "Task was created!"})

            setTitle(""); setDescription(""); setDescription("");
            setStartAtDate(""); setStartAtTime(""); setEndAtDate(""); setEndAtTime("");

        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
        } finally {
            setIsOpenNotification(true);
        }
    

    }

    const blockFormRefresh = (e) => {
        e.preventDefault();
        createTask();
    }

    useEffect(() => { 
        getChecklist();
         getAllPriorities() 
    },[])

    return (
        <section className={styles.section}>

            <div className={styles.headerMenu}>
                <h1 className={styles.title}><h2>Create a new task from <span style={{color: "#ed6f07"}}>{checklistSelected?.title ?? "no title"}</span></h2></h1>
            </div>
            
            <div className={styles.containerDefault}>

                <form onSubmit={blockFormRefresh} className={styles.formEditTask}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="titleTask">Title</label>
                        <input type="text" onChange={(event) => { setTitle(event.target.value) }} value={title} name="titleTask" id="titleTask" placeholder='Title of this task' formNoValidate/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="textTask">Description</label>
                        <textarea type="textarea" rows="4" onChange={(event) => { setDescription(event.target.value) }} value={description} name="textTask" id="textTask" placeholder='A description text about this task'></textarea>
                    </div>

                    <div className={styles.dateTimeBox}>
                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="startedAtTask">Start on Date</label>
                            <input type="date" className={styles.inputDateTime} onChange={(event) => { setStartAtDate(event.target.value) }} value={startAtDate} name="startedAtTask" id="startedAtTask"/>
                        </div>

                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="startedAtTask">Start at time</label>
                            <input type="time" className={styles.inputDateTime} onChange={(event) => { setStartAtTime(event.target.value) }} value={startAtTime} name="startAtTime" id="startAtTime" placeholder='Start task'/>
                        </div>
                    </div>

                    <div className={styles.dateTimeBox}>
                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="endAtTask">End at date</label>
                            <input type="date" className={styles.inputDateTime} onChange={(event) => { setEndAtDate(event.target.value) }} value={endAtDate} name="endAtTask" id="endAtTask"/>
                        </div>

                        <div className={styles.inputGroupDateTime}>
                            <label htmlFor="endAtTask">End at time</label>
                            <input type="time" className={styles.inputDateTime} onChange={(event) => { setEndAtTime(event.target.value) }} value={endAtTime} name="endAtTask" id="endAtTask" placeholder='End task'/>
                        </div>
                    </div>



                    <div className={styles.priorityBox}>

                                <div className={styles.priorityInputGroup}>
                                    <label htmlFor="endAtTask">Choose priority</label>
                                    
                                    <select name="priorityTask" id="priorityTask" className={styles.selectPriorityTask} onChange={(event) => { setPriority(event.target.value); console.log("event: " + event.target.value)}}>
                            
                                {   
                                    (priorities != null) ? (

                                        priorities.map((p) => {
                                            
                                            return <option key={p.id} value={p.priority}>{p.priority}</option>

                                        })
                                    ) : (

                                        <option value="no">no</option>

                                    )
                                }

                                </select>
                                </div>

                                
                                <div className={styles.priorityInputGroup}>
                                    <label htmlFor="endAtTask">Current priority</label>
                                    <div> 
                                        <h4 style={{color: colorPriority(priority)}}>{priority}</h4>
                                    </div>
                                </div>

                    </div>

                    
                    <div className={styles.btnFlex}>
                        <Link to={"/lists"}>
                            <button className={styles.btnForm + " " + styles.btnBack}>Back</button>
                        </Link>
                        <button className={styles.btnForm + " " + styles.btnEdit}>Create</button>
                    </div>
                    

                </form>
            </div>
            
            
            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>
         
        </section>
        
    )

}