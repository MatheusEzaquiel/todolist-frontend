import { useState } from "react"

import { useNavigate, Link } from "react-router-dom"
import { GoPlusCircle } from "react-icons/go"

import { ChecklistService } from "../../../services/api/checklists/ChecklistService"
import useDataAuth from "../../../app/useDataAuth"
import { Notification } from "./../../../components/notification/Notification"
import { Input } from "./../../../components/input/Input"
import { HeaderPage } from "../../../components/header-page/HeaderPage"

export const CreateList = () => {

    const navigate = useNavigate()

    const basicUserData = useDataAuth()

    const [ title, setTitle] = useState("")

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""});


    const createChecklist = async() => {

        const dataToCreate = {
            title: title,
            userId: basicUserData.dataAuth.id
        }


        try {

            if(dataToCreate.title != "" && dataToCreate.title != null && dataToCreate.title.length > 0 && dataToCreate.userId != "" && dataToCreate.userId.length != 0) {
               
                const res = await ChecklistService.create(dataToCreate);

                setResultApi({status: "ok", message: "List created!"})

                setTimeout( () => {
                    navigate(`/todolist-frontend/create-task/${res.id}`)
                }, 3000)

            } else {
                setResultApi({status: "error", message: "Field name is blank"})
                setIsOpenNotification(true)
            }

        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
        } finally { 
            setTitle("")
            setIsOpenNotification(true)
        }

    }

    const changeHandler = (e) => {
        console.log(e.target.value)
        const inputId = e.target.id
        if(inputId == "title") setTitle(e.target.value)
    }

    const blockFormRefresh = (e) => {
        e.preventDefault();
        createChecklist();
    }

    return(
        
    
        <section className="section w-[100vw] lg:w-[90%] lg:mx-auto">

            <HeaderPage title="Create">
                <i className="">create lists</i>
            </HeaderPage>

            <div className="w-[60%] h-[60vh] mx-auto p-6 bg-gray-100 relative lg:mx-auto lg:mt-16 lg:h-[40vh]">


                    <h2 className="text-2xl text-center text-black pt-6 pb-8">Create a new list</h2>

                    <form onSubmit={blockFormRefresh} className="w-full h-full mr-auto ml-auto flex flex-col lg:w-11/12">

                        <Input 
                            title={"Title"}
                            type={"text"}
                            placeholder={"title"}
                            data={title}
                            onChange={changeHandler}
                            inputName={"title"}
                            isRequired={true}
                        />
                    

                        <div className="w-[80%] flex flex-col gap-4 absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:flex-row lg:justify-between pb-3">
                            <Link to={"/todolist-frontend/lists"} className="lg:w-[40%]">
                                <button className="w-full p-2 text-white font-medium text-lg bg-orange rounded-lg lg:full">Back</button>
                            </Link>
                            <button className="w-full p-2 text-white font-medium text-lg bg-green rounded-lg lg:w-[40%]">Create</button>
                        </div>
                    </form>
             
            </div>

            <Notification
                enabled={isOpenNotification}
                close={() => setIsOpenNotification(false)}
                element={{type: resultApi.type, message:resultApi.message}}>
            </Notification>
        </section>
    )

}