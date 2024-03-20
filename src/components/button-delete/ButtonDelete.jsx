import "./ButtonDelete.css"
import { Link } from "react-router-dom"

export const ButtonDelete = ({taskId}) => {

    const handleOpenModal = () => {
        console.log("task id: " + taskId)
    }
    
    return (

        <button className="w-[200px] h-[40px] rounded-lg text-white bg-light-rose" onClick={() => {handleOpenModal()} }>
            <Link to={`/edit/${taskId}`}>{text}</Link>
        </button>

    )

}