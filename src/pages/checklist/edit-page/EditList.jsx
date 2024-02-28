import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import styles from "./EditList.module.css"

import { Notification } from "./../../../components/notification/Notification";

import { ApiException } from "../../../services/api/ApiException" 
import { ChecklistService } from "../../../services/api/checklists/ChecklistService"

export const EditList = () => {

    const navigate = useNavigate();

    const { checklistId } = useParams()

    const [ title, setTitle] = useState("")
    const [ checklist, setChecklist ] = useState(null)

    const [ checklistUpdated, setChecklistUpdated] = useState(null)
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

            setChecklistUpdated(res);
            setChecklist(res);
            
            console.log("Checklist updated")
            setResponseApi({status:200, message:"Checklist updated!"})

            setTimeout(() => {
                navigate("/lists");
            }, 2500)

        } catch (ex) {

            if (ex instanceof ApiException) {
                setIsOpenNotification(true)
                setResponseApi({status:200, message: ex.message})
            }

        } finally {
            setIsOpenNotification(true)
        }

    }


    const blockFormRefresh = (e) => {
        e.preventDefault();
        updateChecklist();
    }

    useEffect(() => {
        getChecklist();
    },[])


    return(
        
        <section className={styles.section}>

            <div className={styles.headerMenu}>
            </div>

            <div className={styles.containerDefault}>

                <div className={styles.formEdit}>

                    <h2>Edit the list</h2>

                    <form onSubmit={blockFormRefresh}>

                        <div className={styles.inputGroup}>
                            <label htmlFor="checklistTitle">Title</label>
                            <input type="text" onChange={(event) => { setTitle(event.target.value) }} value={title} name="checklistTitle" id="checklistTitle" placeholder={checklist?.title ?? 'Title...'}/>
                        </div>
                        
                        <div className={styles.btnFlex}>
                            <Link to={"/lists"}>
                                <button className={styles.btnForm + " " + styles.btnBack}>Back</button>
                            </Link>
                            <button className={styles.btnForm + " " + styles.btnEdit}>Update</button>
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