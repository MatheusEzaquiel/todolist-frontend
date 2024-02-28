import './Navbar.css'
import { useEffect, useState } from 'react'
import { GoPerson } from 'react-icons/go';
import { Link } from 'react-router-dom'

export const Navbar = () => {

    const [userLoggedData, setUserLoggedData] = useState(JSON.parse(localStorage.getItem("userLoggedData")) == null ? {username: null } : JSON.parse(localStorage.getItem("userLoggedData")));

    useEffect( () => {
    }, [userLoggedData])

    return (

        <ul className="navbar">
            
            <Link to={"/lists"}>
                <li>Lists</li>
            </Link>
            <Link to={"/archiveds"}>
                <li>Archiveds</li>
            </Link>

            {
                userLoggedData?.username ? 
                <Link to={"/my"}><li className="username"><GoPerson/> {userLoggedData.username} </li></Link> :
                <Link to={"/login"}><li className="username">Login</li></Link>
            }
        
        </ul>

    )

}