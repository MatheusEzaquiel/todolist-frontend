import './Navbar.css'
import { useEffect, useState } from 'react'
import { GoPerson } from 'react-icons/go';
import { Link } from 'react-router-dom'

export const Navbar = () => {

    const [userLoggedData] = useState(JSON.parse(localStorage.getItem("userLoggedData")) == null ? {username: null } : JSON.parse(localStorage.getItem("userLoggedData")));

    useEffect( () => {
    }, [userLoggedData])

    return (

        <ul className="navbar">
            
            <Link to={"/todolist-frontend/lists"}>
                <li>Lists</li>
            </Link>
            <Link to={"/todolist-frontend/archiveds"}>
                <li>Archiveds</li>
            </Link>

            {
                userLoggedData?.username ? 
                <Link to={"/todolist-frontend/my"}><li className="username"><GoPerson/> {userLoggedData.username} </li></Link> :
                <Link to={"/todolist-frontend/login"}><li className="username">Login</li></Link>
            }
        
        </ul>

    )

}