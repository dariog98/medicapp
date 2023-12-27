import { getTokenFromRequest } from "../helpers/generateToken.js"
import { httpError } from "../helpers/handleErrors.js"
import { handleResponse, handleResponseCustomStatus } from "../helpers/handleResponse.js"
import Exception from "../models/exception.js"

const getException = async (request, response) => {
    try {
        const { id } = request.params
        const exception = await Exception.getByID(id)

        if (exception) {
            const status = 200
            const message = ''
            handleResponse(response, status, message, exception)
        } else {
            const status = 404
            const message = 'Exception not found'
            handleResponse(response, status, message)
        }
    } catch (error) {
        httpError(response, error)
    }
}

const createException = async (request, response) => {
    try {
        const { idProfesional, startDateTime, endDateTime, description } = request.body
        const accessToken = await getTokenFromRequest(request)
        const createdBy = accessToken.id

        Exception.create({
            createdBy,
            idProfesional,
            startDateTime,
            endDateTime,
            description
        })
        .then(result => {
            const status = 201
            const message = 'Exception create successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            console.log(error)
            if ([50001, 23000].includes(Number(error?.original?.sqlState))) {
                const httpStatus = 409
                const status = 50001
                const message = `An error occurred while trying to create the exception: The chosen time and day are not available`
                handleResponseCustomStatus(response, httpStatus, status, message)
            } else {
                const status = 500
                const message = `An error occurred while trying to create the exception: ${error.message}`
                handleResponse(response, status, message)
            }
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updateException = async (request, response) => {
    try {
        const { id } = request.params
        const { startDateTime, endDateTime, description } = request.body
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        const exception = await Exception.findOne({ where: { id } })

        if (!exception) {
            const status = 404
            const message = 'Exception is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await exception.update({ modifiedBy, startDateTime, endDateTime, description })

        const status = 200
        const message = 'Exception updated successfully'
        handleResponse(response, status, message, exception)

        /*
        Exception.update(
            { modifiedBy, startDateTime, endDateTime, description },
            { where: { id } }
        )
        .then(result => {
            const status = 200
            const message = 'Exception updated successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            const status = 500
            const message = 'An error occurred while trying to edit the exception'
            handleResponse(response, status, message, undefined, error)
        })
        */
    } catch (error) {
        if ([50001, 23000].includes(Number(error?.original?.sqlState))) {
            const httpStatus = 409
            const status = 50001
            const message = `An error occurred while trying to update the exception: The chosen time and day are not available`
            handleResponseCustomStatus(response, httpStatus, status, message)
        } else {
            const status = 500
            const message = `An error occurred while trying to update the exception: ${error.message}`
            handleResponse(response, status, message)
        }
    }
}

const deleteException = async (request, response) => {
    try {
        const { id } = request.params

        const exception = await Exception.findOne({ where: { id } })

        if (!exception) {
            const status = 404
            const message = 'Exception is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await exception.destroy()

        const status = 200
        const message = 'Exception deleted successfully'
        handleResponse(response, status, message)
        /*
        const result = await Exception.destroy({
            where: { id }
        })

        if (result) {
            const status = 200
            const message = 'Exception deleted successfully'
            handleResponse(response, status, message)
        } else {
            const status = 500
            const message = 'An error occurred while trying to delete the exception'
            handleResponse(response, status, message)
        }*/
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getException,
    createException,
    updateException,
    deleteException
}