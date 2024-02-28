import "./ButtonDelete.css"
import { Link } from "react-router-dom"

export const ButtonDelete = ({taskId}) => {

    
    const handleOpenModal = () => {
        console.log("task id: " + taskId)
        
    }

    
    return (

        <button className="btnLink" onClick={() => {handleOpenModal()} }>
            <Link to={`/edit/${taskId}`}>{text}</Link>
        </button>

    )

}