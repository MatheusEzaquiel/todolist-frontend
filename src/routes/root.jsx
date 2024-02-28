import "./../index.css";
import { Outlet } from "react-router-dom";
import { Header } from "../assets/Header/Header";
import { Login } from "../pages/login/Login";
import useToken from "../app/useToken";

export default function Root() {


    const token = useToken();
    

    return (
      <>
        <Outlet />
      </>
    );
  }