import "./../index.css";
import { Outlet } from "react-router-dom";

export default function Root() {

    return (
      <>
        <Outlet />
      </>
    );
    
  }