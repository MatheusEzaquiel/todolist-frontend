import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { ChecklistService } from "../../../services/api/checklists/ChecklistService"
import { TaskService } from "./../../../services/api/tasks/taskService"
import { TaskPriorityService } from "./../../../services/api/taskPriority/TaskPriorityService"
import { Input } from "../../../components/input/Input"
import { InputArea } from "../../../components/input/InputArea"
import { Notification } from "../../../components/notification/Notification"


export const CreateTask = () => {

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""})

    const { checklistId } = useParams();

    const [ checklistSelected, setChecklistSelected ] = useState(null)

    const [ title, setTitle] = useState("")
    const [ description, setDescription] = useState("")
    const [ priority, setPriority] = useState("no")

    const [ startAtDate, setStartAtDate] = useState("")
    const [ startAtTime, setStartAtTime] = useState("")

    const [ endAtDate, setEndAtDate] = useState("")
    const [ endAtTime, setEndAtTime] = useState("")

    const [priorities, setPriorities] = useState()

    
    const getChecklist = async() => {

        try {
            
            const res = await ChecklistService.getById(checklistId)

            setChecklistSelected(res)

        } catch (ex) {
            console.log(ex.message)
        } 

    }

    const getAllPriorities = async() => {

        try {

            const res = await TaskPriorityService.list()
            setPriorities(res);
            
            setPriority(res[0].priority)

        } catch (ex) {
            console.log(ex.message)
        }

    }

    const colorPriority = (priority) => {

        if(priority == "high") return "#d90b1f"
        if(priority == "medium") return "#e3770b"
        if(priority == "low") return "#e3dc0b"
        if(priority == "no") return "#8f8d8d"
        if(priority == "" || priority == null) return "#8f8d8d"

    }
    

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

            await TaskService.create(dataToCreate)
           
            setResultApi({status: "ok", message: "Task was created!"})

            setTitle(""); setDescription("");
            setStartAtDate(""); setStartAtTime(""); setEndAtDate(""); setEndAtTime("");
            setPriority("no")

        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
        } finally {
            setIsOpenNotification(true)
        }
    

    }

    const changeHandler = (e) => {
        const inputId = e.target.id
        if(inputId == "title") setTitle(e.target.value)
        if(inputId == "description") setDescription(e.target.value)
    }

    const blockFormRefresh = (e) => {
        e.preventDefault()
        createTask()
    }

    useEffect(() => { 
        getChecklist()
        getAllPriorities() 
    },[])

    return (
        <section className="section w-[90%] lg:w-[60%] mx-auto">

            <div className="w-[100%] flex items-center justify-center p-3 pb-5 border-b-2 border-gray-200">
                <h1 className="text-center pt-8 text-3xl">Create a new task from <span style={{color: "#ed6f07"}}>{checklistSelected?.title ?? "no title"}</span></h1>
            </div>
            
            <div className="w-[90%] h-full mx-auto p-2 rounded bg-white lg:w-[60%] mt-8">

                <form onSubmit={blockFormRefresh} className="w-full p-2 my-2 h-[60%] bg-gray-100 p-6">

                    <Input 
                        title={"Title"}
                        type={"text"}
                        placeholder={title}
                        value={title}
                        data={title}
                        onChange={changeHandler}
                        inputName={"title"}
                        isRequired={true}
                    />

                    <InputArea 
                        title={"Description"}
                        placeholder={description}
                        value={description}
                        data={description}
                        onChange={changeHandler}
                        rows="4"
                        inputName={"description"}
                        isRequired={false}
                    />

                    <div className="w-[100%] flex flex-col mb-6 lg:flex-row">
                        <div className="w-[100%] flex flex-col mb-6 lg:flex-row">
                            <label htmlFor="startedAtTask" className="flex gap-2 items-center mb-1 font-semibold text-lg mr-2">Start on Date</label>
                            <input type="date" className="p-3 rounded bg-gray focus:outline-none focus:bg-gray-200" onChange={(event) => { setStartAtDate(event.target.value) }} value={startAtDate} name="startedAtTask" id="startedAtTask"/>
                        </div>

                        <div className="w-[100%] flex flex-col mb-6 lg:flex-row">
                            <label htmlFor="startedAtTask" className="flex gap-2 items-center mb-1 font-semibold text-lg mr-2">Start at time</label>
                            <input type="time" className="p-3 rounded bg-gray focus:outline-none focus:bg-gray-200" onChange={(event) => { setStartAtTime(event.target.value) }} value={startAtTime} name="startAtTime" id="startAtTime" placeholder='Start task'/>
                        </div>
                    </div>

                    <div className="w-[100%] flex flex-col mb-6 lg:flex-row">
                        <div className="w-[100%] flex flex-col mb-6 lg:flex-row">
                            <label htmlFor="endAtTask" className="flex gap-2 items-center mb-1 font-medium text-lg mr-2">End at date</label>
                            <input type="date" className="p-3 rounded bg-gray focus:outline-none focus:bg-gray-200 text-lg mr-2" onChange={(event) => { setEndAtDate(event.target.value) }} value={endAtDate} name="endAtTask" id="endAtTask"/>
                        </div>

                        <div className="w-[100%] flex flex-col mb-6 lg:flex-row">
                            <label htmlFor="endAtTask" className="flex gap-2 items-center mb-1 font-semibold text-lg mr-2">End at time </label>
                            <input type="time" className="p-3 rounded bg-gray focus:outline-none focus:bg-gray-200" onChange={(event) => { setEndAtTime(event.target.value) }} value={endAtTime} name="endAtTask" id="endAtTask" placeholder='End task'/>
                        </div>
                    </div>



                    <div className="flex justify-between">

                        <div className="w-1/2">
                            <label htmlFor="endAtTask" className="text-lg font-semibold">Choose priority</label>
                            
                            <select name="priorityTask" id="priorityTask" className="w-[80%] bg-gray h-full text-center text-xl text-black font-medium" onChange={(event) => { setPriority(event.target.value); console.log("event: " + event.target.value)}}>
                    
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

                        
                        <div className="w-1/2">
                            <label htmlFor="endAtTask" className="text-lg font-semibold">Current priority</label>
                            <div className="flex items-center justify-center"> 
                                <h4 style={{color: colorPriority(priority)}} className="text-3xl pt-4 font-medium">{priority}</h4>
                            </div>
                        </div>

                    </div>


                    <div className="w-full h-36 flex flex-col items-center justify-center gap-4 mt-32 lg:flex-row lg:gap-12">
                        <Link to={"/todolist-frontend/lists"} className="w-full lg:w-[40%]">
                            <button className="w-full filter hover:brightness-80 bg-orange h-12 rounded text-white font-bold w-[50%]">
                            Back</button>
                        </Link>

                        <button className="w-full filter hover:brightness-80 bg-green h-12 rounded text-white font-bold lg:w-[40%]">
                            Create
                        </button>
                    </div>
                    

                </form>
            </div>
            
            
            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>
                                
        </section>
        
    )

}