import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineMore } from "react-icons/ai"
import { GoPlusCircle } from "react-icons/go"
import { MdEdit } from "react-icons/md"
import { IoArchive } from "react-icons/io5"

import { Task } from "../Task/Task"
import { Modal } from "./../modal/Modal"
import { ChecklistService } from "../../services/api/checklists/ChecklistService"


export const List = ({ checklistData, taskData, handleNotification, archivingList }) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const archiveChecklist = async (checklistId) => {

        try {

            if (confirmDelete) {

                await ChecklistService.deleteById(checklistId)
                archivingList();

            } else {
                alert("Action Canceled!")
            }

        } catch (ex) {
            console.error(ex.message)
        } finally {
            setConfirmDelete(false)
            setIsOpen(false);
            handleNotification()
        }

    }

    const handlerChangeActionList = (e) => {

        if (e.target.value == "edit") {
            navigate(`/todolist-frontend/edit-checklist/${checklistData.id}`);

        } else {
            setIsOpen(true);
        }
    }

    useEffect(() => {

        if (confirmDelete) {
            archiveChecklist(checklistData.id)
        }

        if (isOpen) {

            let lists = document.getElementsByName("collapseActions")
            for (let i = 0; i < lists.length; i++) {
                lists[i].open = false;
            }
        }
    }, [confirmDelete, isOpen])


    return (

        <div className="w-100% h-100% mb-4 rounded-lg lg:min-w-[30%] lg:h-[50vh]">

            {/*div className="h-[75%] px-6 overflow-y-scroll overflow-x-hidden overflow-y-hidden">*/}
            <div className="h-full">

                {/* Header */}
                <div className="w-full h-[20%] mb-4 p-2 shadow-lg rounded-2xl
                    flex items-center justify-between relative px-6 mb-6
                    bg-amber-500 rounded-xl">

                    <h3 className="truncate text-2xl text-white">{checklistData.title}</h3>

                    <details name="collapse" className="w-32 z-10 absolute top-2 right-2">

                        <summary className="text-white text-5xl list-none flex justify-end">
                            <AiOutlineMore />
                        </summary>

                        <div className="w-[50vw] flex flex-col">
                            <div className="w-full h-32 absolute z-40">
                                <Link to={`/todolist-frontend/edit-checklist/${checklistData.id}`}>
                                    <button className="filter hover:brightness-80 bg-emerald-300 w-full h-12 rounded-t-lg text-white font-bold" onClick={(e) => handlerChangeActionList(e)}>
                                        <div className="flex items-center justify-center gap-2">
                                            <MdEdit />
                                            <p>Edit</p>
                                        </div>
                                    </button>
                                </Link>
                                <button className="filter hover:brightness-80 bg-amber-300 w-full h-12 rounded-b-lg text-white font-bold" onClick={() => { setIsOpen(true); }}>
                                    <div className="flex items-center justify-center gap-2">
                                        <IoArchive />
                                        <p>Archive</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </details>
                </div>

                <Task taskData={taskData} checklistData={checklistData} isArchived={false} />

                {/* Footer */}
                <div className="w-full h-[20%] mb-4 p-2 rounded-2xl
                    bg-slate-100 opacity-80 shadow-lg
                    flex items-center justify-center 
                    lg:p-4">
                    <Link to={`/todolist-frontend/create-task/${checklistData.id}`}>
                        <button className="text-slate-400 flex items-center justify-center gap-2 py-4 text-2xl">
                            <GoPlusCircle fontSize="2.2rem" />
                            <p>New task</p>
                        </button>
                    </Link>
                </div>
            </div>

            <Modal openModal={isOpen} closeModal={() => { setIsOpen(false) }} confirmDelete={() => { setConfirmDelete(true) }}>
                <p>Are you sure archive this List?</p>
            </Modal>

        </div>
    );

}