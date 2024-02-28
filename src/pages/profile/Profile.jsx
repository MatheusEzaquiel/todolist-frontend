import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoKey, GoPerson } from "react-icons/go"
import { AiOutlineMail } from "react-icons/ai"

import styles from "./Profile.module.css"

import { Notification } from "../../components/notification/Notification"
import { UserService } from "../../services/api/users/UserService"
import Activity from "./../../components/activity/Activity"
import useToken from "../../app/useToken"

export const Profile = () => {

    const navigate = useNavigate()
    const tokenAuth = useToken()

    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [resultApi, setResultApi] = useState({type: "", message: ""})

    const [userLoggedData] = useState(JSON.parse(localStorage.getItem("userLoggedData")))


    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const blockFormRefresh = (e) => {
        e.preventDefault();
    }

    const getUser = async(userLoggedId) => {

        try {

            const res = await UserService.getById(userLoggedId)
            console.log(JSON.stringify(res))
            setUserData(res)

        } catch (ex) {
            console.log("Error: " + ex.message)
        } 

    }

    const updateUser = async() => {

        try {

            const res = await UserService.updateById(userLoggedData.id, userData)
            
            setResultApi({status: "ok", message: "User data was edited!"})
            
            console.log(JSON.stringify(res))

            //dataAuth.setDataAuth()
            tokenAuth.setToken(res.token)

            
            //UserService.logout()
            //navigate(0)

        } catch (ex) {
            setResultApi({status: "error", message: ex.message})
        } finally {
            setIsOpenNotification(true);
        }

    }

    useEffect(() => {
        getUser(userLoggedData.id)
    },[])


    return(

        <section>

            <div className={styles.headerMenu}>
                <h1 className={styles.title}>Profile</h1>
                <p>Edit and view your data</p>
            </div>
            

            <div className={styles.userArea}>

                <form className={styles.profileForm} onSubmit={blockFormRefresh} >

                    <h2 className={styles.titleForm}>Edit</h2>

                    <div className={styles.inputGroup2}>
                        <label htmlFor="username"><span><GoPerson/></span>Username</label>
                        <input type="text" onChange={(e) => { setUserData({...userData, username: e.target.value}) }}  value={userData.username} name="username" id="username" placeholder={userData?.username ?? 'New username...'} />
                    </div>

                    <div className={styles.inputGroup2}>
                        <label htmlFor="email"><span><AiOutlineMail /></span>E-mail</label>
                        <input type="text" onChange={(e) => { setUserData({...userData, email: e.target.value}) }} value={userData.email} name="email" id="email" placeholder={userData?.email ?? 'New e-mail...'}/>
                    </div>

                    <div className={styles.inputGroup2}>
                        <label htmlFor="password"><span><GoKey/></span>Password</label>
                        <input type="text" onChange={(e) => { setUserData({...userData, password: e.target.value}) }}  name="password" id="password" placeholder="********"/>
                    </div>
                    
                    <div className={styles.btnFlex2}>
                        <button className={styles.btnForm2  + " " + styles.btnBack} onClick={() => { navigate("/lists") }}>Back</button>
                        <button className={styles.btnForm2  + " " + styles.btnEdit} onClick={() => updateUser()}>update</button>
                    </div>

                    <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: resultApi.type, message: resultApi.message}}></Notification>

                </form>

                
                <Activity></Activity>
          
            </div>
            
        </section>


    );

}