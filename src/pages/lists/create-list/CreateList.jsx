import { useState } from "react"

import { useNavigate, Link } from "react-router-dom"

import styles from "./CreateList.module.css"

import { Notification } from "./../../../components/notification/Notification"
import { ChecklistService } from "../../../services/api/checklists/ChecklistService"
import useDataAuth from "../../../app/useDataAuth"

export const CreateList = () => {

    const navigate = useNavigate()

    const basicUserData = useDataAuth()

    const [ title, setTitle] = useState("")

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""});

    //const [userToken] = useState(JSON.parse(localStorage.getItem("userToken")));
  


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
            console.error("error: " + ex.message)
            setResultApi({status: "error", message: ex.message})
        } finally { 
            setTitle("")
            setIsOpenNotification(true)
        }

    }


    const blockFormRefresh = (e) => {
        e.preventDefault();
        createChecklist();
    }

    return(
        
    
        <section className={styles.section}>

        <div className={styles.headerMenu}>
        </div>

        <div className={styles.containerDefault}>

            <div className={styles.formEdit}>

                <h2>Create a list</h2>

                <form onSubmit={blockFormRefresh}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Title</label>
                        <input type="text" required onChange={(event) => { setTitle(event.target.value) }} value={title} name="title" id="title" placeholder='Title List'/>
                    </div>

                    <div className={styles.btnFlex}>
                        <Link to={"/lists"}>
                            <button className={styles.btnForm + " " + styles.btnBack}>Back</button>
                        </Link>
                        <button className={styles.btnForm + " " + styles.btnEdit}>Create</button>
                    </div>
                </form>
            </div>
        </div>

            <Notification
                enabled={isOpenNotification}
                close={() => setIsOpenNotification(false)}
                element={{type: resultApi.type, message:resultApi.message}}>
            </Notification>
        </section>
    )

}