import { useEffect, useState } from "react";

import styles from "./Activity.module.css";

import { UserService } from "../../services/api/users/UserService";
import { Link } from "react-router-dom";
import { ButtonLogout } from "../Buttons/Buttons";
import { ApiException } from "../../services/api/ApiException";
import { Notification } from "../notification/Notification";


const Activity = () => {

    const [userActivity, setUserActivity] = useState({});
    const [errorActivity, setErrorActivity] = useState("");
    const [isOpenNotification, setIsOpenNotification] = useState(false)

    const userLoggedData = JSON.parse(localStorage.getItem("userLoggedData"));

    const getActivity = async(userLoggedId) => {

        try {

            const res = await UserService.getActivityById(userLoggedId);
            
            setUserActivity(res);

        } catch (error) {

            if (error instanceof ApiException) {
                console.error("API EXCEPTION: " + error.message);
            }

            setErrorActivity(error.message)
            setIsOpenNotification(true)

        } 

    }

    useEffect(() => {
        getActivity(userLoggedData.id);
    },[])

    

    return(
        <div className={styles.activityContainer}>
            <Link to="/lists">
            <div className={styles.activityItem + " " + styles.createColor}>
                <p>Created Lists</p>
                <span>{userActivity?.quantityLists ?? "0"}</span>
            </div>
            </Link>

            <Link to="/lists">
            <div className={styles.activityItem + " " + styles.createColor}>
                <p>Archived Lists</p>
                <span>{userActivity?.quantityArchivedLists ?? "0"}</span>
            </div>
            </Link>

            <Link to="/archiveds">
            <div className={styles.activityItem + " " + styles.archiveColor}>
                <p>Late tasks</p>
                <span>{userActivity?.quantityLateTasks ?? "0"}</span>
            </div>
            </Link>

            <div className={styles.containerButton + " " + styles.endContainer}>
                <ButtonLogout>Logout</ButtonLogout>
            </div>

            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: "error", message: errorActivity}}></Notification>

        </div>
    )

}

export default Activity;