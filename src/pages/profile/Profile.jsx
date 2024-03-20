import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoKey, GoPerson } from "react-icons/go"
import { MdAlternateEmail } from "react-icons/md";


import { Notification } from "../../components/notification/Notification"
import { UserService } from "../../services/api/users/UserService"
import Activity from "./../../components/activity/Activity"
import { HeaderPage } from "./../../components/header-page/HeaderPage"
import { Input } from "./../../components/input/Input"

export const Profile = () => {

    const navigate = useNavigate()

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""})

    const [userLoggedData] = useState(JSON.parse(localStorage.getItem("userLoggedData")))
    const [userData, setUserData] = useState({username: "" ?? "",  password: "" ?? "", email: "" ?? ""})
    const [dataToUpdate, setDataToUpdate] = useState({username: "" ?? "",  password: "" ?? "", email: "" ?? ""})


    const blockFormRefresh = (e) => {
        e.preventDefault();
    }

    const getUser = async(userLoggedId) => {

        try {
            const res = await UserService.getById(userLoggedId)
            setUserData(res)

        } catch (ex) {
            setResultApi({type: "error", message: "Error to get data of the user!"})
        } 

    }

    const updateUser = async() => {

        try {

            const res = await UserService.updateById(userLoggedData.id, dataToUpdate)
            
            setResultApi({status: "ok", message: "User data was edited!"})
            
            console.log("res: " + JSON.stringify(res))

            localStorage.setItem("authToken", res.token)
            localStorage.setItem("userLoggedData", JSON.stringify(res.user))
            
           
            UserService.logout();

            setTimeout(() => {
                //navigate("/todolist-frontend/login")
                navigate(0)
            }, 2000)
            
            
            
        } catch (ex) {
            setResultApi({type: "error", message: ex.message})
        } finally {
            setIsOpenNotification(true);
            
            /*
            dataAuth.setDataAuth({id: null, message: null, token: null})
            
            setTimeout(() => {
                navigate(0)
            }, 2000)
            */
        }

    }

    const changeHandler = (e) => {

        const inputId = e.target.id;

        if(inputId == "username") setDataToUpdate({...dataToUpdate, username: e.target.value})
        if(inputId == "email") setDataToUpdate({...dataToUpdate, email: e.target.value})
        if(inputId == "password") setDataToUpdate({...dataToUpdate, password: e.target.value})
    }

    useEffect(() => {
        getUser(userLoggedData.id)
    },[])


    return(

        <section className="w-screen">


            <div className="p-6 lg:w-4/5 lg:mx-auto lg:flex lg:items-center lg:justify-center lg lg:gap-5 lg:h-[80vh]">

                <form className="mb-16 lg:w-[60%] lg:h-[60%] bg-white lg:px-32" onSubmit={blockFormRefresh} >

                    <h2 className="text-orange-100 font-bold text-4xl text-center my-8">Profile</h2>

                    <Input 
                        title={"Username"}
                        type={"text"}
                        placeholder={userData?.username}
                        data={userData?.username}
                        onChange={changeHandler}
                        inputName={"username"}
                        isRequired={false}
                        icon={<GoPerson/>}
                    />

                    <Input 
                        title={"E-mail"}
                        type={"email"}
                        placeholder={userData?.email}
                        data={userData?.email}
                        onChange={changeHandler}
                        inputName={"email"}
                        isRequired={false}
                        icon={<MdAlternateEmail />}
                    />

                    <Input 
                        title={"Password"}
                        type={"password"}
                        placeholder={"********"}
                        data={userData?.password}
                        onChange={changeHandler}
                        inputName={"password"}
                        isRequired={false}
                        icon={<GoKey/>}
                    />

                    
                    <div className="flex flex-col justify-around w-auto h-40 mt-16 lg:w-full lg:gap-4 lg:flex lg:flex-row lg:mx-auto lg:justify-around">

                        <button className="filter hover:brightness-80 bg-orange w-full h-12 rounded text-white font-bold lg:w-1/2" onClick={() => { navigate("/todolist-frontend/lists") }}>Back</button>

                        <button className="filter hover:brightness-80 bg-green-2 w-full h-12 rounded text-white font-bold lg:w-1/2" onClick={() => updateUser()}>Update</button>

                    </div>

                    <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>

                </form>

                
                <Activity></Activity>
          
            </div>
            
        </section>


    );

}