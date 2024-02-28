import { Link } from "react-router-dom";
import "./OptionBox.css";

export const OptionBox = ({redirectTo, children}) => {

    return(
        
        <>
            <Link to={`/${redirectTo}`}>
                <div className="optionBox"> {children} </div> 
            </Link>
        </>
        

    )

}