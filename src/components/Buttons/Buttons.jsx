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
        <button className="w-full h-14 text-white text-2xl font-semibold bg-orange-100 rounded flex gap-2 items-center justify-center mx-auto lg:w-1/2" onClick={handlerRemoveUserToken}>
            <span><IoLogOutOutline/></span> <p>{children}</p>
        </button>
    )

}