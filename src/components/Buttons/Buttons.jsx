import styles from "./Buttons.module.css";

import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/api/users/UserService";

import { IoLogOutOutline } from "react-icons/io5";

export const ButtonLogout = ({children}) => {

    const navigate = useNavigate();

    const handlerRemoveUserToken = () => {
        UserService.logout();
        navigate("/");
    }

    return (
        <button className={styles.btnClassic} onClick={handlerRemoveUserToken}>
            <span><IoLogOutOutline/></span> <p>{children}</p>
        </button>
    )

}