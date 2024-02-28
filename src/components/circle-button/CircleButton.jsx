import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import "./CircleButton.css";

export const circuleButton = (checklistId) => {

    return(

        <div className="circleAddList">
            <Link to={`/create-task/${checklistId}`}><GoPlus/></Link>
        </div>

    )
}