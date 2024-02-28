import { Api } from "../ApiConfig"
import { ApiException } from "../ApiException"

const list = async () => {

    try {
        const { data } = await Api().get("/task-priority")
        return data;
    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to list all priorities")
    }

}

const getById = async (id) => {

    try {
        const { data } = await Api().get(`/users/${id}`)
        return data
    } catch(ex) {
        throw new ApiException(ex.message || `Error to the get the user`)
    }

}

const create = async (dataToCreate) => {

    try {
        const { data } = await Api().post("/users", dataToCreate, {

                headers: {
                    'Content-type': 'application/json'
                }
        })

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to create a new user")
    }

}

const updateById = async (id, dataToUpdate) => {

    try {

        const { data } = await Api().put(`/users/${id}`, dataToUpdate)

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to update user")
    }
}

const deleteById = async (id) => {

    try {
        
        const data = await Api().delete(`/users/${id}`)
        
        return data;

    } catch (ex) {
        throw new ApiException(ex.response.data.error || "Error to delete user")
    }

}

const login = async (dataToLogin) => { 

    try {

        console.log(dataToLogin);

        const data = await Api().post(`/auth/login`, dataToLogin , {

            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }

        })

        return data;
        
    } catch (ex) {
        throw new ApiException(ex.response.data.error || "Error login")
    }

}

export const TaskPriorityService =  {
    list,
    getById,
    create,
    updateById,
    deleteById,
    login
}