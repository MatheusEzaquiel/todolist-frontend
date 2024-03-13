import { Link } from "react-router-dom"
import { FaCirclePlus } from "react-icons/fa6"

export const ButtonAddCard = () => {

    return(
        <div className="hidden lg:min-w-[25%] lg:h-[50vh] lg:bg-gray lg:flex lg:items-center lg:justify-center">
            <Link to={`/todolist-frontend/create-list`}>
                <button><FaCirclePlus fontSize={"4rem"}/></button>
            </Link> 
        </div>
    )

}