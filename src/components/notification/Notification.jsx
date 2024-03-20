import { GoVerified } from "react-icons/go"
import { IoClose } from "react-icons/io5"
import { IoMdNotifications } from "react-icons/io"

export const Notification = ({children, enabled, close, element}) => {

    if(!enabled) {
        return null
    }

    setTimeout(() => {
        close();
    }, 3000)

    return(

            <div className="w-[80vw] h-[20vh] absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange-200 p-2 z-10 text-white rounded-lg lg:w-[20vw]">

                <div className="flex justify-between items-center mb-2">
                    <div className="flex justify-between items-center gap-2">
                        <IoMdNotifications className="text-2xl text-white"/>
                        <h4 className="text-xl font-medium">Notification</h4>
                    </div> 
                    <button onClick={close} className="">
                        <IoClose className="text-3xl text-white"/>
                    </button>
                </div>

                <hr />

                <div className="pl-4 mt-4">
                    <p className="text-white text-xl">{element?.message ?? children ?? "Action accepted"}</p>
                </div>
            </div>

    )

}