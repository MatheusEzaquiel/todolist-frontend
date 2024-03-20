import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";

import { ApiException } from '../../services/api/ApiException'
import { UserService } from '../../services/api/users/UserService'
import useDataAuth from '../../app/useDataAuth'


export const Navbar = () => {

    const basicUserData = useDataAuth()

    const createUserLoggedData = async() => {

        try {

            const res = await UserService.getById(basicUserData.dataAuth.id)

            const userLoggedData = {
                id: res.id,
                username: res.username,
                role: res.role
            }

            localStorage.setItem("userLoggedData", JSON.stringify(userLoggedData))

        } catch (ex) {

            if (ex instanceof ApiException) {
                console.error("ERROR: " + ex.message)
            }

        } 

    }

    createUserLoggedData();

    const [userLoggedData] = useState(JSON.parse(localStorage.getItem("userLoggedData")) == null ? {username: null } : JSON.parse(localStorage.getItem("userLoggedData")))


    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        console.log("changed to " + isOpen)
        setIsOpen(!isOpen);
    };
    
    useEffect( () => {
        createUserLoggedData()
    }, [userLoggedData])
    

    return (

        <header>

            <div className="bg-orange w-full h-[10vh] text-white text-xl font-bold flex justify-around items-center">

                <Link to={"/todolist-frontend/lists"}>
                    <h1 className="justify-self-left text-xl">MB | Lists</h1>
                </Link>


                {/* Desktop Navbar */}
                <ul className="hidden md:block md:flex justify-around md:items-center md:gap-16 md:text-lx">
                    
                    <Link to={"/todolist-frontend/lists"}>
                        <li className="font">Lists</li>
                    </Link>
                    <Link to={"/todolist-frontend/archiveds"}>
                        <li>Archiveds</li>
                    </Link>
                    
                    <Link to={"/todolist-frontend/my"}>
                        <li className="username">Profile</li>
                    </Link>
                </ul>

                <button onClick={toggleMenu} className=' inline-flex md:hidden'>
                    { isOpen ? <MdClose  fontSize={"2.5rem"}/> : <MdMenu  fontSize={"2.5rem"}/>}
                </button>
        
            </div>

            <div >

            
                {/* Mobile Navbar */}
                {
                    isOpen ? (

                        <ul className="flex justify-around items-center gap-16 text-xl py-2 bg-orange-2 text-white font-semibold md:hidden">
                    
                            <Link to={"/todolist-frontend/lists"}>
                                <li className="">Lists</li>
                            </Link>
                            <Link to={"/todolist-frontend/archiveds"}>
                                <li>Archiveds</li>
                            </Link>
                            
                            <Link to={"/todolist-frontend/my"}>
                                <li className="username">Profile</li>
                            </Link>
                        </ul>

                    ) : null

                }

            </div>

        </header>
        

    )

}