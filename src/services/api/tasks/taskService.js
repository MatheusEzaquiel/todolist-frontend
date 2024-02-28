import { Api } from "../ApiConfig"
import { ApiException } from "../ApiException"

const list = async () => {

    try {

        const { data } = await Api().get("/tasks")

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to list tasks of the API")
    }

}

const getById = async (id) => {

    try {

        const { data } = await Api().get(`/tasks/${id}`)

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || `Error to get the task with the id ${id}`)
    }

}

const create = async (dataToCreate) => {

    try {

        const { data } = await Api().post("/tasks", dataToCreate, {
         
        })

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to create a new task")
    }

}

const updateById = async (id, dataToUpdate) => {

    try {

        const { data } = await Api().put(`/tasks/${id}`, dataToUpdate)

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || `Error to update this task`)
    }
}

const deleteById = async (id) => {

    try {
        
        const data = await Api().delete(`/tasks/${id}`)
        
        return data;

    } catch (ex) {
        throw new ApiException(ex.response.data.error || `Error to delete task with id ${id}`)
    }

}

export const TaskService =  {
    list,
    getById,
    create,
    updateById,
    deleteById
}