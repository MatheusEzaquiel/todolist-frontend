import axios from 'axios';

export const Api = () => {

    if(!localStorage.getItem("userToken")) {

        return axios.create({
            baseURL: "http://localhost:8080",
        })

    } else {

        let tokenAuth = JSON.parse(localStorage.getItem("userToken"))

        return axios.create({
            baseURL: "http://localhost:8080",
            headers: {
                "Authorization": `Bearer ${tokenAuth.token}`
            }
        })

    }

    
}

