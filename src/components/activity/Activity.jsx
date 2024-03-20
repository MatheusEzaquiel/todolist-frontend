import { useEffect, useState } from "react";

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
                setResultApi(ex.message)
                setIsOpenNotification(true)
            }
            
        } 

    }

    useEffect(() => {
        getActivity(userLoggedData.id);
    },[])

    

    return(
        <div className="w-full lg:w-[40%] lg:h-[60%] lg:mt-8">

            <h2 className="text-2xl text-black text-center mb-10 font-medium">Your activity</h2>

            <Link to="/todolist-frontend/lists">
                <div className="w-full h-20 flex justify-between items-center px-4 mb-6 bg-gray-200 rounded hover:bg-green-2 hover:-translate-y-2 lg:hover:translate-x-16 duration-500">
                    <p className="text-2xl">Created Lists</p>
                    <span className="text-4xl font-bold">{userActivity?.quantityLists ?? "0"}</span>
                </div>
            </Link>

            <Link to="/todolist-frontend/archiveds">
                <div className="w-full h-20 flex justify-between items-center px-4 mb-6 bg-gray-200 rounded hover:bg-yellow-1 hover:-translate-y-2 lg:hover:translate-x-16 duration-500">
                    <p className="text-2xl">Archived Lists</p>
                    <span className="text-4xl font-bold">{userActivity?.quantityArchivedLists ?? "0"}</span>
                </div>
            </Link>

            <Link to="/todolist-frontend/lists">
                <div className="w-full h-20 flex justify-between items-center px-4 mb-6 bg-gray-200 hover:bg-orange rounded hover:-translate-y-2 lg:hover:translate-x-16 duration-500">
                    <p className="text-2xl">Late tasks</p>
                    <span className="text-4xl font-bold">{userActivity?.quantityLateTasks ?? "0"}</span>
                </div>
            </Link>

            <div className="w-full">
                <ButtonLogout>Logout</ButtonLogout>
            </div>

            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: "error", message: resultApi}}></Notification>

        </div>
    )

}

export default Activity;