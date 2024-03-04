import { useEffect, useState } from "react";

import styles from "./Activity.module.css";

import { UserService } from "../../services/api/users/UserService";
import { Link } from "react-router-dom";
import { ButtonLogout } from "../Buttons/Buttons";
import { ApiException } from "../../services/api/ApiException";
import { Notification } from "../notification/Notification";


const Activity = () => {

    const [userActivity, setUserActivity] = useState({});
    const [resultApi, setResultApi] = useState("");
    const [isOpenNotification, setIsOpenNotification] = useState(false)

    const userLoggedData = JSON.parse(localStorage.getItem("userLoggedData"));

    const getActivity = async(userLoggedId) => {

        try {

            const res = await UserService.getActivityById(userLoggedId);
            
            setUserActivity(res);

        } catch (ex) {

            if (ex instanceof ApiException) {
                console.error("API EXCEPTION: " + ex.message);
                setResultApi(ex.message)
                setIsOpenNotification(true)
            }
            
        } 

    }

    useEffect(() => {
        getActivity(userLoggedData.id);
    },[])

    

    return(
        <div className={styles.activityContainer}>
            <Link to="/todolist-frontend/lists">
            <div className={styles.activityItem + " " + styles.createColor}>
                <p>Created Lists</p>
                <span>{userActivity?.quantityLists ?? "0"}</span>
            </div>
            </Link>

            <Link to="/todolist-frontend/archiveds">
            <div className={styles.activityItem + " " + styles.createColor}>
                <p>Archived Lists</p>
                <span>{userActivity?.quantityArchivedLists ?? "0"}</span>
            </div>
            </Link>

            <Link to="/todolist-frontend/lists">
            <div className={styles.activityItem + " " + styles.archiveColor}>
                <p>Late tasks</p>
                <span>{userActivity?.quantityLateTasks ?? "0"}</span>
            </div>
            </Link>

            <div className={styles.containerButton + " " + styles.endContainer}>
                <ButtonLogout>Logout</ButtonLogout>
            </div>

            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: "error", message: resultApi}}></Notification>

        </div>
    )

}

export default Activity;