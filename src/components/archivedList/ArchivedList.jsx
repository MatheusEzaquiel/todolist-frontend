import { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { LuArchiveRestore } from "react-icons/lu";

import styles from "./ArchivedList.module.css";

import { Task } from "../Task/Task";
import { Modal } from "../modal/Modal"
import { Notification } from "../notification/Notification";
import { ChecklistService } from "../../services/api/checklists/ChecklistService";
import { ApiException } from "../../services/api/ApiException";


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

                <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}>
                </Notification>

            </div>
        
    );

}