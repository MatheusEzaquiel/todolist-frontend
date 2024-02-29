import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { GoPerson } from "react-icons/go"

import styles from "./Register.module.css";
import stylesHome from "./../login/Login.module.css";

import { Notification } from "../../components/notification/Notification";
import { UserService } from "../../services/api/users/UserService";


export const Register = () => {

    const navigate = useNavigate();

    const [resultApi, setResultApi] = useState({type: "", message: ""})
    const [isOpenNotification, setIsOpenNotification] = useState(false)

    const [ dataRegister, setDataRegister ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleConfirmPassword = (event) => {
        setDataRegister({...dataRegister, confirmPassword: event.target.value})
    }

    const validation = () => {

        if(dataRegister.username.length < 3) {
            setResultApi({status: "error", message: "The username field needs to have 3 caracters or more"})
            setIsOpenNotification(true)
        } else if(dataRegister.password.length < 8) {
            setResultApi({status: "error", message: "The password field needs to have 8 caracters or more"})
            setIsOpenNotification(true)
        } else {
            registerUser()
        }


    }


    const registerUser = async() => {

        try {

            await UserService.register({ 
                username: dataRegister.username,
                email: dataRegister.email,
                password: dataRegister.password,
                role: "USER"
            });

            setResultApi({status: "ok", message: "User was registered!"})

            setDataRegister({})
         
            setTimeout(() => {
                navigate("/todolist-frontend/login")
            }, 3000)

        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
        } finally {
            setIsOpenNotification(true)
        }
    
    }


    const blockFormRefresh = (e) => {
        e.preventDefault();
        validation();
    }

    return (
        <> 
           <section className={stylesHome.container}>

                <div className={stylesHome.homeContainer}>

                    <div className={stylesHome.welcomeContainer}>

                        <div className={stylesHome.welcomeText}>
                            <h1>Create an account</h1>
                            <p>
                                Take the first step toward an amazing experience! Create your account now and enjoy all the
                                benefits our platform has to offer.
                            </p>
                        </div>

                    </div>

                    <div className={stylesHome.loginContainer}>
                        
                        <form className={stylesHome.loginForm} onSubmit={blockFormRefresh}>

                            <h2>Register</h2>

                            <div className={stylesHome.inputGroupLogin}>
                                <label htmlFor="username"><GoPerson/>Username</label>
                                <input type="text" required onChange={(event) => { setDataRegister({...dataRegister, username: event.target.value}) }} value={dataRegister.username || ''} name="username" id="username" placeholder='Username'/>
                            </div>

                            <div className={stylesHome.inputGroupLogin}>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" required onChange={(event) => { setDataRegister({...dataRegister, email: event.target.value}) }} value={dataRegister.email || ''} name="email" id="email" placeholder='user@email.com'/>
                            </div>

                            <div className={stylesHome.inputGroupLogin}>
                                <label htmlFor="password">Password</label>
                                <input type="password" required onChange={(event) => { setDataRegister({...dataRegister, password: event.target.value}) }} value={dataRegister.password || ''} name="password" id="password" placeholder='********'/>
                            </div>

                            <div className={stylesHome.inputGroupLogin}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" required onChange={(event) => { handleConfirmPassword(event) }} value={dataRegister.confirmPassword || ''} name="confirmPassword" id="confirmPassword" placeholder='********'/>
                            </div>

                            { dataRegister.password !== dataRegister.confirmPassword ? <span className={styles.passwordConfirm}>Password not corresponding</span> : ""}

                            <div className={styles.btnGroupRegister}>
                                <button className={styles.btnRegister}>Register</button>
                                <Link to="/todolist-frontend/login"><p>After create a account, Go to <span>Login</span></p></Link>
                            </div>

                        </form>

                    </div>

                </div>  
            </section>  

            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>
        </>
        
    )

}