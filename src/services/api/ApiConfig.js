import axios from 'axios';

export const Api = () => {
    if(!localStorage.getItem("userToken")) {

        return axios.create({
            baseURL: "https://todolist-q55z.onrender.com"
        })

    } else {

        let tokenAuth = JSON.parse(localStorage.getItem("userToken"))

        return axios.create({
            baseURL: "https://todolist-q55z.onrender.com",
            headers: {
                "Authorization": `Bearer ${tokenAuth.token}`
            }
        })

    }

    
}

