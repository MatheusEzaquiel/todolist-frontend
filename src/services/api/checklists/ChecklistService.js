import { Api } from "../ApiConfig"
import { ApiException } from "../ApiException"

const list = async (userId) => {

    try {

        const { data } = await Api().get(`/checklists/user/${userId}`)

        return data

    } catch(ex) {
        throw ApiException(ex.response.data.error || "Error to get checklists")
    }

}

const listArchiveds = async (userId) => {

    try {

        const { data } = await Api().get(`/checklists/archiveds/user/${userId}`)

        return data

    } catch(ex) {
        throw new ApiException(ex.response.data.error || "Error to get the archived lists")
    }

}

const getById = async (id) => {

    try {

        const { data } = await Api().get(`/checklists/${id}`)

        return data

    } catch(ex) {
        return new ApiException(ex.response.data.error || `Error to get the checklist with the id ${id}`)
    }

}

const create = async (dataToCreate) => {

    try {

        const { data } = await Api().post("/checklists", dataToCreate, {

        })

        return data

    } catch(ex) {
        return new ApiException(ex.response.data.error || "Error to create a new checklist")
    }

}

const updateById = async (id, dataToUpdate) => {

    try {

        const { data } = await Api().put(`/checklists/${id}`, dataToUpdate)

        return data

    } catch(ex) {
       throw new ApiException(ex.response.data.error || `Error to update list with id ${id}`)
    }
}

const deleteById = async (id) => {

    try {
        
        const data = await Api().delete(`/checklists/${id}`)
        
        return data;

    } catch (ex) {
        throw new ApiException(ex.response.data.error || `Error to delete list with id ${id}`)
    }

}

const unarchiveById = async (id) => {

    try {
        
        const data = await Api().put(`/checklists/unarchive/${id}`)
        
        return data;

    } catch (ex) {
        throw new ApiException(ex.response.data.error || `Error to unarchive list and his tasks`)
    }

}

export const ChecklistService =  {
    list,
    listArchiveds,
    getById,
    create,
    updateById,
    deleteById,
    unarchiveById
}