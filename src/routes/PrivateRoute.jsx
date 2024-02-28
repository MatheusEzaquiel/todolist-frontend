import { Navigate } from "react-router-dom";
import useDataAuth from "../app/useDataAuth";
import { Header } from "../assets/Header/Header";
import { UserService } from "../services/api/users/UserService";

const PrivateRoute = ({children}) => {

    const dataAuth = useDataAuth();
    
    let isAuthenticated = false;
      
    if(dataAuth.dataAuth?.token != null && dataAuth.dataAuth?.token != undefined && dataAuth.dataAuth?.token != "") {
        isAuthenticated = true;
    }

    isAuthenticated ? children : <Navigate to="/"/>;
    
    if(isAuthenticated) {

        return ( <><Header/> {children}</>);

    } else {

        UserService.logout();
        return <Navigate to="/"/>;

    }


}

export default PrivateRoute;