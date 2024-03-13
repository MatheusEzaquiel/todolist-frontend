import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"


import { Notification } from "./../../../components/notification/Notification";

import { ApiException } from "../../../services/api/ApiException" 
import { ChecklistService } from "../../../services/api/checklists/ChecklistService"
import { HeaderPage } from "../../../components/header-page/HeaderPage";
import { Input } from "./../../../components/input/Input"

export const EditList = () => {

    const navigate = useNavigate();

    const { checklistId } = useParams()

    const [ title, setTitle] = useState("")
    const [ checklist, setChecklist ] = useState(null)
    
    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [responseApi, setResponseApi] = useState({
        status: 0,
        message: ""
    });
    

    const getChecklist = async() => {
        try {
            const res = await ChecklistService.getById(checklistId);
            setChecklist(res);
        } catch (ex) {
            console.log(ex.message)
        } 
    }

    const updateChecklist = async() => {
        
        const dataToUpload = {
            title: title
        }
       
        try {

            const res = await ChecklistService.updateById(checklistId, dataToUpload);

            setChecklist(res);
            
            console.log("Checklist updated")
            setResponseApi({status:200, message:"Checklist updated!"})

            setTimeout(() => {
                navigate("/todolist-frontend/lists");
            }, 2100)

        } catch (ex) {

            if (ex instanceof ApiException) {
                setIsOpenNotification(true)
                setResponseApi({status:200, message: ex.message})
            }

        } finally {
            setIsOpenNotification(true)
        }

    }

    const changeHandler = (e) => {

        const inputId = e.target.id;
    
        if(inputId == "title") setTitle(e.target.value)
    
      }

    const blockFormRefresh = (e) => {
        e.preventDefault();
        updateChecklist();
    }

    useEffect(() => {
        getChecklist();
    },[])


    return(
        
        <section className="section w-[60%] h-[100vh]">

            <HeaderPage title="Lists">
                <i>Edit the list</i>
            </HeaderPage> 

            <div className="w-[90%] h-full mx-auto p-6 rounded bg-gray-200 lg:w-[40%] mt-32">

                <div className="w-full h-full">

                    <h2 className="text-center text-3xl mb-6">Edit the list</h2>

                    <form onSubmit={blockFormRefresh} className="w-full p-2 my-2 h-[60%]">

                        <Input 
                            title={"Title"}
                            type={"text"}
                            placeholder={"title"}
                            data={title}
                            onChange={changeHandler}
                            inputName={"title"}
                            isRequired={true}
                        />

                        <div className="w-full h-36 flex flex-col items-center justify-center gap-4 mt-32 lg:flex-row">

                            <Link to={"/todolist-frontend/lists"} className="w-full lg:w-1/2">
                                <button className="w-full filter hover:brightness-80 bg-orange h-12 rounded text-white font-bold w-[50%]">
                                Back</button>
                            </Link>

                            <button className="w-full filter hover:brightness-80 bg-green  h-12 rounded text-white font-bold lg:w-[50%]">
                            Update</button>
                        </div>

                    </form>

                </div>
            </div>

            <Notification 
                enabled={isOpenNotification}
                close={() => setIsOpenNotification(false)}
                element={{type: responseApi.status, message: responseApi.message}}>    
            </Notification>
            
        </section>
       
    )

}