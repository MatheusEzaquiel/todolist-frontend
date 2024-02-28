import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";
import { GoPlusCircle } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { IoArchive } from "react-icons/io5";
import { LuArchiveRestore } from "react-icons/lu";

import styles from "./List.module.css";

import { Task } from "../Task/Task";
import { Modal } from "../modal/Modal"
import { Notification } from "../notification/Notification";
import { ChecklistService } from "../../services/api/checklists/ChecklistService";
import { ApiException } from "../../services/api/ApiException";


export const List = ( { checklistData, taskData, archived, handleNotification } ) => {

    const navigate = useNavigate();

    const [checklistDeleted, setChecklistDeleted] = useState()

    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const [selectActions, setSelectActions] = useState();

    const [listsArchiveds, setListsArchiveds] = useState();

    const getAllDisabledLists = async() => {

        try {

            const res = await ChecklistService.listArchiveds();

            setListsArchiveds(res);

            console.log(JSON.stringify(res))

            
        } catch (e) {

            if (e instanceof ApiException) {
                alert(e.message);
            } else {
                console.error(e.message);
            }

        }

    }


    const deleteChecklist = async(checklistId) => {

        try {

            if(confirmDelete) {

                const res = await ChecklistService.deleteById(checklistId);

                setChecklistDeleted(res);

            } else {
                alert("Action Canceled!");
            }
            
        } catch (e) {

            if (e instanceof ApiException) {
                alert(e.message);
            } else {
                console.error(e.message);
            }

        }  finally {
            setConfirmDelete(false);
            setIsOpen(false);
            handleNotification();
        }

    }


    const unarchiveList = async(listId) => {

        try {

            const res = await ChecklistService.unarchiveById(listId);

            console.log("desarquivado!!!!!!!" + listId)

        } catch (e) {

            if (e instanceof ApiException) {
                alert(e.message);
            } else {
                console.error(e.message);
            }

        }  finally {
            setConfirmDelete(false);
            setIsOpen(false)
            //setIsOpenAlert(true)

            //setTimeout(() => { setIsOpenAlert(false)}, 0.1)
        }
    }

    const handlerChangeActionList = (e) => {

        if(e.target.value == "edit") {
            console.log("ok");
            navigate(`/edit-checklist/${checklistData.id}`);
            
        } else {
            setIsOpen(true);
        }
        e.target.value
    }

    useEffect(() => {

        getAllDisabledLists();

        if(confirmDelete) {
            deleteChecklist(checklistData.id)
        }

    }, [confirmDelete])
    

    return(

            <div className={styles.listContainer}>

                <div className={styles.listHeader}>

                    <h3>{ checklistData.title }</h3>

                    <details className={styles.collapse}>
                        <summary className={styles.title}><AiOutlineMore /></summary>

                        {(archived == true ?  

                            <button className={styles.btnList + " " + styles.unarchive} onClick={() => unarchiveList(checklistData.id)}>
                                <div className={styles.btnWithIcon}>
                                    <LuArchiveRestore /> <p>Unarchive</p>    
                                </div>
                            </button>

                            :
                            <>
                                <Link to={`/edit-checklist/${checklistData.id}`}>
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
                        )}

                    </details>

                </div>

                <div className={styles.listBody}>
                    <Task taskData={taskData} checklistData={checklistData}/>
                </div>

               

                <div className={styles.listFooter}>
                    <Link to={`/create-task/${checklistData.id}`}>
                        <button>
                            <span><GoPlusCircle/> new task</span>
                        </button>
                    </Link>
                </div>


                <Modal openModal={isOpen} closeModal={ () => { setIsOpen(false) }} confirmDelete={ () => { setConfirmDelete(true); console.log(confirmDelete) } }>
                    <p>Are you sure delete this List?</p>
                </Modal>
               

            </div>
        
    );

}