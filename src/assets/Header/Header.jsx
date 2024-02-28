import { Link } from 'react-router-dom'

import './Header.css'
import { Navbar } from '../../assets/Navbar/Navbar'

export const Header = () => {

    return (

        <div className="header">
            <Link to={"/lists"}>
                <h1>Lists MB</h1>
            </Link>
            <Navbar/>
        </div>

    )

}