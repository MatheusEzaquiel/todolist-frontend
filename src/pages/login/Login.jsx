import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { GoKey, GoPerson } from "react-icons/go"

import styles from "./Login.module.css"

import { Notification } from "../../components/notification/Notification";
import { UserService } from "../../services/api/users/UserService";
import useDataAuth from "../../app/useDataAuth";

export const Login = () => {

  
  const navigate = useNavigate();
  const isLogged = useDataAuth();
  const dataAuth = useDataAuth();

  const [isOpenNotification, setIsOpenNotification] = useState(false)
  const [resultApi, setResultApi] = useState({type: "", message: ""});
  const [ dataLogin, setDataLogin ] = useState({ username: '', password: ''})


  const doLogin = async() => {

    try {

      const res = await UserService.login({ 
        username: dataLogin.username,
        password: dataLogin.password
      });

      //token.setToken(res.data);
      dataAuth.setDataAuth(res.data);

      localStorage.setItem("authToken", res.data.token);

      setResultApi({status: "ok", message: "Login accepted!"})

      setTimeout( () => {
        navigate("/todolist-frontend/lists");
      }, 3000)

  } catch (ex) {
    setResultApi({status: "error", message: ex.message})
  } finally {
    setDataLogin({});
    setIsOpenNotification(true);
  }

}

const blockFormRefresh = (e) => {
    e.preventDefault();
    doLogin();
}

  useEffect(() => {
    if(isLogged?.dataAuth) UserService.logout()
  }, [])


  return (

    <section className={styles.container}>

      <div className={styles.homeContainer}>

        <div className={styles.welcomeContainer}>

          <div className={styles.welcomeText}>
            <h1 className="md:bg-lime-500">Welcome to your To Do List</h1>
            <p>Where you can create your own Lists and tasks for organizate your life</p>
          </div>

        </div>

        <div className={styles.loginContainer}>
          
          <form className={styles.loginForm} onSubmit={blockFormRefresh}>

            <h2>Sign in</h2>

            <div className={styles.inputGroupLogin}>
              <label htmlFor="username"><span><GoPerson/></span>username</label>
              <input type="text" onChange={(event) => { setDataLogin({...dataLogin, username: event.target.value}) }} value={dataLogin.username || ''} name="username" id="username" placeholder='Username'/>
            </div>

            <div className={styles.inputGroupLogin}>
              <label htmlFor="password"> <span><GoKey/></span>Password</label>
              <input type="password" onChange={(event) => { setDataLogin({...dataLogin, password: event.target.value}) }} value={dataLogin.password || ''} name="password" id="password" placeholder='Password'/>
            </div>

            <div className={styles.btnGroupLogin}>
              <button className={styles.btnLogin}>Login</button>
              <Link to="/todolist-frontend/register"><p>Don not have a account? <span>Register</span></p></Link>
            </div>

          </form>

        </div>

        <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>
      </div>  
    </section>  

  )
}
