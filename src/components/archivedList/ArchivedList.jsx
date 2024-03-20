import { useEffect, useState } from "react"
import { AiOutlineMore } from "react-icons/ai"
import { LuArchiveRestore } from "react-icons/lu"

import { Task } from "../Task/Task";
import { Modal } from "../modal/Modal"
import { Notification } from "../notification/Notification"
import { ChecklistService } from "../../services/api/checklists/ChecklistService"


export const ArchivedList = ( { checklistData, taskData, handleNotification, refreshUnarchivedLists } ) => {

    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""})
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    
    const deleteChecklist = async(checklistId) => {

        try {

            if(confirmDelete) {

                await ChecklistService.deleteById(checklistId);
                setResultApi({type: "ok", message: "List deleted!"})

            } else {
                alert("Action Canceled!");
            }
            
        } catch (ex) {

            setResultApi({type: "error", message: ex.message})

        }  finally {

            //getAllDisabledLists();
            /*
            setConfirmDelete(false);
            setIsOpen(false);
            handleNotification();
            */
        }

    }


    const unarchiveList = async(listId) => {

        try {

            await ChecklistService.unarchiveById(listId);
            setResultApi({type: "ok", message: "The List was unarchived"})

        } catch (ex) {

            setResultApi({type: "error", message: ex.message})

        }  finally {
            setConfirmDelete(false);
            setIsOpen(false)
            refreshUnarchivedLists();
            //setIsOpenAlert(true)

            //setTimeout(() => { setIsOpenAlert(false)}, 0.1)
        }
    }

    useEffect(() => {

        //getAllDisabledLists();

        if(confirmDelete) {
            deleteChecklist(checklistData.id)
        }

    }, [confirmDelete])
    

    return(

            <div className="w-100% h-[60vh] mb-4 bg-gray rounded-lg lg:min-w-[24%] lg:h-[50vh]">

                <div className="w-full h-[12%] flex items-center justify-between px-2 bg-yellow  rounded-t-lg">

                    <h3 className="truncate text-2xl text-white">{ checklistData.title }</h3>

                    <details className="bg-red z-10">
                        <summary className="text-white text-5xl list-none"><AiOutlineMore /></summary>

                            <div className="w-[50vw] flex flex-col">
                                <button className="filter hover:brightness-80 bg-yellow w-full h-12 rounded text-white font-bold" onClick={() => unarchiveList(checklistData.id)}>
                                    <div className="flex items-center justify-center gap-2">
                                        <LuArchiveRestore color="white"/>
                                        <p>Unarchive</p>    
                                    </div>
                                </button>
                            </div>

                    </details>

                </div>

                <div className="h-[75%] overflow-y-scroll overflow-x-hidden">
                    <Task taskData={taskData} checklistData={checklistData} isArchived={true}/>
                </div>

               

                <div className="w-full h-[13%] flex items-center justify-center bg-yellow rounded-b-lg">
                    <button onClick={() => unarchiveList(checklistData.id)} 
                        className="text-white flex items-center justify-center gap-2 text-2xl"
                    >
                        <LuArchiveRestore color="white"/>
                        <p>Unarchive</p>
                    </button>
                </div>


                <Modal openModal={isOpen} closeModal={ () => { setIsOpen(false) }} confirmDelete={ () => { setConfirmDelete(true); console.log(confirmDelete) } }>
                    <p>Are you sure delete this List?</p>
                </Modal>

                <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}>
                </Notification>

            </div>
        
    );

}