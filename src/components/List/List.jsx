import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineMore } from "react-icons/ai"
import { GoPlusCircle } from "react-icons/go"
import { MdEdit } from "react-icons/md"
import { IoArchive } from "react-icons/io5"

import styles from "./List.module.css"

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
            console.log("ok");
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

            <div className={styles.listContainer}>

                <div className={styles.listHeader}>

                    <h3 className="truncate">{ checklistData.title }</h3>

                    <details  name="collapseActions" className={styles.collapse}>
                        <summary className={styles.title}><AiOutlineMore /></summary>

                            <>
                                <Link to={`/todolist-frontend/edit-checklist/${checklistData.id}`}>
                                <button className={styles.btnList + " " +styles.edit} onClick={(e) => handlerChangeActionList(e)}>
                                    <div className={styles.btnWithIcon}>
                                        <MdEdit /> <p>Edit</p>  
                                    </div>
                                </button>
                                </Link>

                                <button className={styles.btnList + " " + styles.remove} onClick={() => { setIsOpen(true); }}>
                                    <div className={styles.btnWithIcon}>
                                        <IoArchive /> <p>Archive</p> 
                                    </div>
                                </button>
                            </>
                
                    </details>

                </div>

                <div className={styles.listBody}>
                    <Task taskData={taskData} checklistData={checklistData} isArchived={false}/>
                </div>

                <div className={styles.listFooter}>
                    <Link to={`/todolist-frontend/create-task/${checklistData.id}`}>
                        <button>
                            <span><GoPlusCircle/> new task</span>
                        </button>
                    </Link>
                </div>


                <Modal openModal={isOpen} closeModal={ () => { setIsOpen(false) }} confirmDelete={ () => { setConfirmDelete(true) } }>
                    <p>Are you sure archive this List?</p>
                </Modal>

            </div>
    );

}