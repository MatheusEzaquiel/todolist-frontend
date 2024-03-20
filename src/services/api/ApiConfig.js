import axios from 'axios';

export const Api = () => {
    
    if(!localStorage.getItem("authToken")) {

        return axios.create({
            baseURL: "http://localhost:8080",
        })

    } else {

        let token = localStorage.getItem("authToken")

        return axios.create({
            baseURL: "http://localhost:8080",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    }

    
}

