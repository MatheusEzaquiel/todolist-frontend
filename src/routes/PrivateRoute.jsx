import { Navigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { UserService } from "../services/api/users/UserService";

const PrivateRoute = ({children}) => {

    const authToken = localStorage.getItem("authToken")
    console.log(authToken)
    
    let isAuthenticated = false

    if(!authToken) isAuthenticated = false

    if(authToken != null && authToken != undefined && authToken != "") {
        isAuthenticated = true;
    }

    isAuthenticated ? children : <Navigate to="/todolist-frontend/login"/>
    
    if(isAuthenticated) {
        return ( <><Header/> {children}</>)
    } else {
        UserService.logout()
        return <Navigate to="/todolist-frontend/login"/>
    }

}

export default PrivateRoute;