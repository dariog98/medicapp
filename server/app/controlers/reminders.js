import { getTokenFromRequest } from '../helpers/generateToken.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse } from '../helpers/handleResponse.js'
import Reminder from '../models/reminder.js'

const getReminder = async (request, response) => {
    try {
        const { id } = request.params
        const result = await Reminder.getByID(id)

        if (result) {
            const status = 200
            const message = ''
            handleResponse(response, status, message, result)
        } else {
            const status = 404
            const message = 'Reminder not found'
            handleResponse(response, status, message)
        }
    } catch (error) {
        httpError(response, error)
    }
}

const createReminder = async (request, response) => {
    try {
        const { idProfesional, idPatient, dateTime, description } = request.body
        const accessToken = await getTokenFromRequest(request)
        const createdBy = accessToken.id

        Reminder.create({
            createdBy,
            idProfesional,
            idPatient,
            dateTime,
            description,
        })
            .then((result) => {
                const status = 201
                const message = 'Reminder create successfully'
                handleResponse(response, status, message, result)
            })
            .catch((error) => {
                console.log(error)
                const status = 500
                const message = `An error occurred while trying to create the reminder: ${error.message}`
                handleResponse(response, status, message)
            })
    } catch (error) {
        httpError(response, error)
    }
}

const updateReminder = async (request, response) => {
    try {
        const { id } = request.params
        const { dateTime, description } = request.body
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        const reminder = await Reminder.findOne({ where: { id } })

        if (!reminder) {
            const status = 404
            const message = 'Reminder is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await reminder.update({ modifiedBy, dateTime, description })

        const status = 200
        const message = 'Reminder updated successfully'
        handleResponse(response, status, message, reminder)

        /*
        Reminder.update(
            { modifiedBy, dateTime, description },
            { where: { id } }
        )
        .then(result => {
            const status = 200
            const message = 'Reminder updated successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            console.log(error)
            const status = 500
            const message = 'An error occurred while trying to update the reminder'
            handleResponse(response, status, message)
        })
        */
    } catch (error) {
        httpError(response, error)
    }
}

const deleteReminder = async (request, response) => {
    try {
        const { id } = request.params

        const reminder = await Reminder.findOne({ where: { id } })

        if (!reminder) {
            const status = 404
            const message = 'Reminder is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await reminder.destroy()

        const status = 200
        const message = 'Reminder deleted successfully'
        handleResponse(response, status, message)

        /*
        Reminder.destroy({
            where: { id }
        })
        .then(result => {
            const status = 200
            const message = 'Reminder deleted successfully'
            handleResponse(response, status, message)
        })
        .catch(error => {
            console.log(error)
            const status = 500
            const message = 'An error occurred while trying to delete the reminder'
            handleResponse(response, status, message)
        })
        */
    } catch (error) {
        httpError(response, error)
    }
}

const getAllReminders = async (request, response) => {
    try {
        const { page, order: stringOrder, startTime, endTime } = request.query
        const order = stringOrder ? JSON.parse(stringOrder) : ['dateTime', 'ASC']
        const { total_pages, results: data } = await Reminder.getPage({
            page: page ? Number(page) - 1 : 0,
            startTime,
            endTime,
            order
        })
        response.send({ status: 200, message: '', data, total_pages })
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getReminder,
    createReminder,
    updateReminder,
    deleteReminder,
    getAllReminders,
}
