import axios from 'axios';

export const Api = () => {
    
    if(!localStorage.getItem("authToken")) {

        return axios.create({
            baseURL: "https://todolist-q55z.onrender.com"
        })

    } else {

        let token = localStorage.getItem("authToken")

        return axios.create({
            baseURL: "https://todolist-q55z.onrender.com",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    }

    
}

