import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineMore } from "react-icons/ai"
import { GoPlusCircle } from "react-icons/go"
import { MdEdit } from "react-icons/md"
import { IoArchive } from "react-icons/io5"

import { Task } from "../Task/Task"
import { Modal } from "./../modal/Modal"
import { ChecklistService } from "../../services/api/checklists/ChecklistService"


export const List = ( { checklistData, taskData, handleNotification, archivingList } ) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const archiveChecklist = async(checklistId) => {

        try {

            if(confirmDelete) {

                await ChecklistService.deleteById(checklistId)
                archivingList();

            } else {
                alert("Action Canceled!")
            }
            
        } catch (ex) {
            console.error(ex.message)
        }  finally {
            setConfirmDelete(false)
            setIsOpen(false);
            handleNotification()
        }

    }

    const handlerChangeActionList = (e) => {

        if(e.target.value == "edit") {
            navigate(`/todolist-frontend/edit-checklist/${checklistData.id}`);
            
        } else {
            setIsOpen(true);
        }
    }

    useEffect(() => {

        if(confirmDelete) {
            archiveChecklist(checklistData.id)
        }

        if(isOpen) {

            let lists = document.getElementsByName("collapseActions")
            for (let i = 0; i < lists.length; i++) {
                lists[i].open = false;
            }
        }
    }, [confirmDelete, isOpen])
    

    return(

            <div className="w-100% h-[60vh] mb-4 bg-gray rounded-lg lg:min-w-[30%] lg:h-[50vh]">

                {/* Header */}
                <div className="w-full h-[12%] flex items-center justify-between relative px-2 bg-orange rounded-t-lg">

                    <h3 className="truncate text-2xl text-white">{ checklistData.title }</h3>

                    <details name="collapse" className="w-32 z-10 absolute top-2 right-2">
                        
                        <summary className="text-white text-5xl list-none flex justify-end">
                            <AiOutlineMore />
                        </summary>

                        <div className="w-[50vw] flex flex-col">

                            <div className="w-full h-32 absolute z-40">

                                <Link to={`/todolist-frontend/edit-checklist/${checklistData.id}`}>
                                <button className="filter hover:brightness-80 bg-green w-full h-12 rounded-t-lg text-white font-bold" onClick={(e) => handlerChangeActionList(e)}>
                                    <div className="flex items-center justify-center gap-2">
                                        <MdEdit />
                                        <p>Edit</p>  
                                    </div>
                                </button>
                                </Link>

                                <button className="filter hover:brightness-80 bg-yellow w-full h-12 rounded-b-lg text-white font-bold" onClick={() => { setIsOpen(true); }}>
                                    <div className="flex items-center justify-center gap-2">
                                        <IoArchive />
                                        <p>Archive</p> 
                                    </div>
                                </button>
                            
                            </div>

                        </div>

                    </details>

                </div>
                

                <div className="h-[75%] overflow-y-scroll overflow-x-hidden overflow-y-hidden">
                    <Task taskData={taskData} checklistData={checklistData} isArchived={false}/>
                </div>

                {/* Footer */}
                <div className="w-full h-[13%] flex items-center justify-center bg-orange rounded-b-lg lg:p-4">
                    <Link to={`/todolist-frontend/create-task/${checklistData.id}`}>
                        <button className="text-white flex items-center justify-center gap-2 text-2xl">
                            <GoPlusCircle fontSize="2.2rem"/>
                            <p>new task</p>
                        </button>
                    </Link>
                </div>

                <Modal openModal={isOpen} closeModal={ () => { setIsOpen(false) }} confirmDelete={ () => { setConfirmDelete(true) } }>
                    <p>Are you sure archive this List?</p>
                </Modal>

            </div>
    );

}