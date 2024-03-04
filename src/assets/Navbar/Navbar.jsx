import './Navbar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoPerson } from 'react-icons/go'

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
    
    useEffect( () => {
        createUserLoggedData()
    }, [userLoggedData])

    return (

        <ul className="navbar">
            
            <Link to={"/todolist-frontend/lists"}>
                <li>Lists</li>
            </Link>
            <Link to={"/todolist-frontend/archiveds"}>
                <li>Archiveds</li>
            </Link>
            
            <Link to={"/todolist-frontend/my"}>
                <li className="username"><GoPerson/>Profile</li>
            </Link>
        
        </ul>

    )

}