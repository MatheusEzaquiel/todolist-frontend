import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { GoKey, GoPerson } from "react-icons/go"

import { Notification } from "../../components/notification/Notification";
import { UserService } from "../../services/api/users/UserService";
import { PainelApresentation } from '../../components/painelApresentation/PainelApresentation';
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

    <section className="w-screen h-screen p-0 m-0 lg:flex items-center">

      <div className="lg:w-4/5 h-screen lg:flex mx-auto lg:h-4/5 xl:h-[90%] xl:w-[70%]">
        
        <PainelApresentation 
          title={"Welcome to your To Do List"}
          text={"Where you can create your own Lists and tasks for organizate your life"}>
        </PainelApresentation>

        {/* Login form Side */}
        <div className="p-6 h-[100%] flex items-center bg-white relative lg:w-1/2">
          
          <form className="w-[100vw] h-full mr-auto ml-auto flex flex-col lg:w-11/12" onSubmit={blockFormRefresh}>

            <h2 className="font-semibold text-4xl text-center mt-16 mb-32">Sign in</h2>

            <div className="flex flex-col mb-6">
              <label htmlFor="username" className="flex gap-2 items-center mb-1"><span><GoPerson/></span>Username</label>
              <input type="text" onChange={(event) => { setDataLogin({...dataLogin, username: event.target.value}) }} value={dataLogin.username || ''} className="p-2 rounded bg-gray" name="username" id="username" placeholder='Username' required/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="flex gap-2 items-center mb-1"> <span><GoKey/></span>Password</label>
              <input type="password" onChange={(event) => { setDataLogin({...dataLogin, password: event.target.value}) }} value={dataLogin.password || ''} className="p-2 rounded bg-gray" name="password" id="password" placeholder='Password' required/>
            </div>

            <div className="">
              <button className="bg-orange w-full h-10 mt-10 rounded text-white font-bold">Login</button>
              <Link to="/todolist-frontend/register"><p className="text-center font-medium mt-6">Don't have a account? <span className=" text-orange-100">Register</span></p></Link>
            </div>

            <p className="absolute bottom-4 inset-x-0 mx-auto w-1/2 text-center font-medium">version 1.0</p>

          </form>

        </div>

        <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>
      </div>  
    </section>  

  )
}
