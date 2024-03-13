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

            <div className="w-[80vw] h-[20vh] bg-orange z-10">

                <div className="notificationHeader glassEffect">
                    <div className="iconAndTitle">
                        <IoMdNotifications color="gray"/><h4 className="title">Notification</h4>
                    </div> 
                    <button onClick={close} className="btnCloseNotification"><IoClose color="gray"/></button>
                </div>
                <div className="notificationContent">
                    <p className="text-gray font-xl">{element?.message ?? children ?? "Action accepted"}</p>
                </div>
            </div>

    )

}