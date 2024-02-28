import { useNavigate } from "react-router-dom"
import { Api } from "./../ApiConfig"
import { ApiException } from "./../ApiException"



const list = async () => {

    try {

        const { data } = await Api().get("/users", )

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to list users")
    }

}

const getById = async (id) => {

    try {

        const { data } = await Api().get(`/users/${id}`)

        return data

    } catch(ex) {
        return new ApiException(ex.response.data.error || `Error to get data about this user`)
    }

}
/*
const create = async (dataToCreate) => {

    try {

        const { data } = await Api().post("/users", dataToCreate, {

                headers: {
                    'Content-type': 'application/json'
                }
        })

        return data

    } catch(e) {
        return new ApiException(e.message || "Error to create a new user")
    }

}*/

const updateById = async (id, dataToUpdate) => {

    try {

        const { data } = await Api().put(`/users/${id}`, dataToUpdate)

        return data

    } catch(ex) {
        return new ApiException(ex.response.data.error || `Error to update`)
    }
}

const deleteById = async (id) => {

    try {
        
        const data = await Api().delete(`/users/${id}`)
        
        return data;

    } catch (ex) {
        return new ApiException(ex.message || `Error to delete user with id ${id}`)
    }

}

const login = async (dataToLogin) => { 

    try {

        const data = await Api().post(`/auth/login`, dataToLogin , {

            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }

        })

        return data;
        
    } catch (ex) {

        throw new ApiException(ex.response.data.error || `Error to the to do login`)
    }

}

const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userLoggedData");
    localStorage.removeItem("dataAuth");
}

const register = async (dataToLogin) => { 

    try {

        const data = await Api().post(`/auth/register`, dataToLogin , {

            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }

        })

        return data;
        
    } catch (ex) {
        throw new ApiException(ex.response.data.error || `Error to register the user`)
    }

}


const getActivityById = async (id) => {

    try {

        const { data } = await Api().get(`/users/activity/${id}`)

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || `Error to get the activity of  a user`)
    }

}

export const UserService =  {
    list,
    getById,
    updateById,
    deleteById,
    login,
    logout,
    register,
    getActivityById
}