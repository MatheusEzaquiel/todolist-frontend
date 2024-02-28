import "./Button.css"

import { Link } from "react-router-dom"
import { GoPencil } from "react-icons/go";

export const Button = ({children, taskId, checklistData}) => {
    
    const handleOpenModal = () => {
        console.log("task id: " + taskId)
        
    }
    
    return (

        <button className="btnTask btnEdit" onClick={() => {handleOpenModal()} }>
            <Link to={`/edit/${checklistData.id}/${taskId}`}>
                <p>{children}</p>
            </Link>
        </button>

    )

}