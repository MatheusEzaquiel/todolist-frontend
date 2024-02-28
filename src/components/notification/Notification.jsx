import { GoVerified } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";

import "./Notification.css"


export const Notification = ({children, enabled, close, element}) => {

    if(!enabled) {
        return null
    }

    setTimeout(() => {
        close();
    }, 3000)

    return(

            <div className="notification">

                <div className="notificationHeader glassEffect">
                    <div className="iconAndTitle">
                        <IoMdNotifications /><h4 className="title">Notification</h4>
                    </div> 
                    <button onClick={close} className="btnCloseNotification"><IoClose /></button>
                </div>
                <div className="notificationContent">
                    <p className="text">{element?.message ?? children ?? "Action accepted"}</p>
                </div>
            </div>

    )

}