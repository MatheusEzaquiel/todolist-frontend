import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";
import { GoPlusCircle } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { IoArchive } from "react-icons/io5";
import { LuArchiveRestore } from "react-icons/lu";

import styles from "./ArchivedList.module.css";

import { Task } from "../Task/Task";
import { Modal } from "../modal/Modal"
import { Notification } from "../notification/Notification";
import { ChecklistService } from "../../services/api/checklists/ChecklistService";
import { ApiException } from "../../services/api/ApiException";


export const ArchivedList = ( { checklistData, taskData, handleNotification, refreshUnarchivedLists } ) => {

    const navigate = useNavigate();

    const [checklistDeleted, setChecklistDeleted] = useState()

    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const [selectActions, setSelectActions] = useState();

    const [listsArchiveds, setListsArchiveds] = useState();

    /*
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
    */
   
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

            getAllDisabledLists();
            /*
            setConfirmDelete(false);
            setIsOpen(false);
            handleNotification();
            */
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
            refreshUnarchivedLists();
            //setIsOpenAlert(true)

            //setTimeout(() => { setIsOpenAlert(false)}, 0.1)
        }
    }

    const handlerChangeActionList = (e) => {

        if(e.target.value == "edit") {
            navigate(`/edit-checklist/${checklistData.id}`);
            
        } else {
            setIsOpen(true);
        }
    }

    useEffect(() => {

        //getAllDisabledLists();

        if(confirmDelete) {
            deleteChecklist(checklistData.id)
        }

    }, [confirmDelete])
    

    return(

            <div className={styles.listContainer}>

                <div className={styles.listHeader}>

                    <h3 className="truncate">{ checklistData.title }</h3>

                    <details className={styles.collapse}>
                        <summary className={styles.title}><AiOutlineMore /></summary>

                            <button className={styles.btnList + " " + styles.unarchive} onClick={() => unarchiveList(checklistData.id)}>
                                <div className={styles.btnWithIcon}>
                                    <LuArchiveRestore /> <p>Unarchive</p>    
                                </div>
                            </button>

                    </details>

                </div>

                <div className={styles.listBody}>
                    <Task taskData={taskData} checklistData={checklistData} isArchived={true}/>
                </div>

               

                <div className={styles.listFooter}>
                    <button onClick={() => unarchiveList(checklistData.id)}>
                        <span><LuArchiveRestore />Unarchive</span>
                    </button>
                </div>


                <Modal openModal={isOpen} closeModal={ () => { setIsOpen(false) }} confirmDelete={ () => { setConfirmDelete(true); console.log(confirmDelete) } }>
                    <p>Are you sure delete this List?</p>
                </Modal>
               

            </div>
        
    );

}