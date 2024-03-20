import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoKey, GoPerson } from "react-icons/go"
import { MdAlternateEmail } from "react-icons/md";

import { Notification } from "../../components/notification/Notification"
import { UserService } from "../../services/api/users/UserService"
import { PainelApresentation } from "../../components/painelApresentation/PainelApresentation"
import { Input } from "../../components/input/Input";


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

    const changeHandler = (e) => {

        const inputId = e.target.id;

        if(inputId == "username") setDataRegister({...dataRegister, username: e.target.value})
        if(inputId == "email") setDataRegister({...dataRegister, email: e.target.value})
        if(inputId == "password") setDataRegister({...dataRegister, password: e.target.value})
        if(inputId == "confirmPassword") setDataRegister({...dataRegister, confirmPassword: e.target.value})

    }

    const blockFormRefresh = (e) => {
        e.preventDefault();
        validation();
    }

    return (
        <> 
            
            <section className="w-screen h-screen p-0 m-0 lg:flex items-center">
                <div className="lg:w-4/5 h-screen lg:flex mx-auto lg:h-4/5 xl:h-[90%] xl:w-[70%]">
                    <div className="p-6 h-[100%] flex items-center bg-white relative lg:w-1/2 lg:h-auto shadow-2xl">
                        
                        <form className="w-[80vw] h-full mr-auto ml-auto flex flex-col lg:w-[80%] lg:h-auto" onSubmit={blockFormRefresh}>

                            <h2 className="font-semibold text-4xl text-center mt-16 mb-6 lg:mb-0 lg:text-3xl lg:mt-0 lg:mb-6">Register</h2>

                            <Input 
                                title={"Username"}
                                type={"text"}
                                placeholder={"username"}
                                data={dataRegister.username}
                                onChange={changeHandler}
                                inputName={"username"}
                                isRequired={true}
                                icon={<GoPerson/>}
                            />

                            <Input 
                                title={"E-mail"}
                                type={"email"}
                                placeholder={"email"}
                                data={dataRegister.email}
                                onChange={changeHandler}
                                inputName={"email"}
                                isRequired={true}
                                icon={<MdAlternateEmail />}
                            />

                            <Input 
                                title={"Password"}
                                type={"password"}
                                placeholder={"********"}
                                value={dataRegister.password}
                                onChange={changeHandler}
                                inputName={"password"}
                                isRequired={true}
                                icon={<GoKey/>}
                            />


                            <Input 
                                title={"Confirm Password"}
                                type={"password"}
                                placeholder={"********"}
                                value={dataRegister.confirmPassword}
                                inputName={"confirmPassword"}
                                onChange={changeHandler}
                                isRequired={true}
                                icon={<GoKey/>}
                            />

                            

                            { dataRegister.password !== dataRegister.confirmPassword ? <span className="text-right text-red font-semibold">Password not corresponding!</span> : ""}

                            <div className="mt-10 lg:mt-2">
                                <button className="bg-orange w-full h-10 rounded text-white font-bold lg:">Register</button>
                                <Link to="/todolist-frontend/login"><p className="text-center font-medium mt-6">After create a account, Go to <span className=" text-orange-100">Login</span></p></Link>
                            </div>

                        </form>



                    </div>

                <PainelApresentation 
                    title={"Create a account"}
                    text={"Fot the better experience `set` your basic a data"}>
                </PainelApresentation>

                </div>  
            </section>  

            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>
        </>
        
    )

}