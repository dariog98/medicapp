import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { ProfesionalsService } from '../services/postgres/index.js'

const getAllProfesionals = async (request, response) => {
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await ProfesionalsService.getAllProfesionals({ search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages})
}

const getProfesional = async (request, response) => {
    const { id: idProfesional } = request.params
    const profesional = await ProfesionalsService.getProfesional({ idProfesional })
    handleResponse({response, statusCode: 200, data: profesional })
}

const getProfesionalEvents = async (request, response) => {
    const { id: idProfesional } = request.params
    const startTime = request.query.startTime ? new Date(request.query.startTime) : new Date()
    const endTime = request.query.endTime ? new Date(request.query.endTime) : new Date(
        Date.UTC(
            startTime.getUTCFullYear(),
            startTime.getUTCMonth(),
            startTime.getUTCDate(),
            startTime.getUTCHours() + 23,
            startTime.getUTCMinutes() + 59,
        )
    )

    const data = await ProfesionalsService.getProfesionalEvents({ idProfesional, startTime, endTime })
    handleResponse({ response, statusCode: 200, data })
}

const getProfesionalTreatments = async (request, response) => {
    const { id: idProfesional } = request.params
    const { order: stringOrder, search, page } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await ProfesionalsService.getProfesionalTreatments({ idProfesional, search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getProfesionalTreatment = async (request, response) => {
    const { id: idProfesional, treatment: idTreatment } = request.params
    const treatment = await ProfesionalsService.getProfesionalTreatment({ idProfesional, idTreatment })
    handleResponse({response, statusCode: 200, data: treatment})
}

const createTreatment = async (request, response) => {
    const { id: idProfesional } = request.params
    const { description } = request.body
    await ProfesionalsService.createProfesionalTreatment({ idProfesional, description })
    handleResponse({ response, statusCode: 201, message: 'Treatment create successfully' })
}

const updateTreatment = async (request, response) => {
    const { id: idProfesional, treatment: idTreatment } = request.params
    const { description } = request.body
    await ProfesionalsService.updateProfesionalTreatment({ idProfesional, idTreatment, description })
    handleResponse({ response, statusCode: 200, message: 'Treatment updated successfully' })
}

const deleteTreatment = async (request, response) => {
    const { id: idProfesional, treatment: idTreatment } = request.params
    await ProfesionalsService.deleteProfesionalTreatment({ idProfesional, idTreatment })
    handleResponse({ response, statusCode: 200, message: 'Treatment deleted successfully' })
}

const createAppointment = async (request, response) => {
    const { id: idProfesional } = request.params
    const { idPatient, dateTime, duration, idTreatment, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.idUser

    await ProfesionalsService.createProfesionalAppointment({ idProfesional, idPatient, dateTime, duration, idTreatment, description, createdBy })
    handleResponse({ response, statusCode: 201, message: 'Appointment create successfully' })
}

const updateAppointment = async (request, response) => {
    const { id: idProfesional, appointment: idAppointment } = request.params
    const { dateTime, duration, idTreatment, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.idUser

    await ProfesionalsService.updateProfesionalAppointment({ idProfesional, idAppointment, dateTime, duration, idTreatment, description, modifiedBy })
    handleResponse({ response, statusCode: 200, message: 'Appointment updated successfully' })
}

const deleteAppointment = async (request, response) => {
    const { id: idProfesional, appointment: idAppointment } = request.params
    await ProfesionalsService.deleteProfesionalAppointment({ idProfesional, idAppointment })
    handleResponse({ response, statusCode: 200, message: 'Appointment deleted successfully' })
}

const createException = async (request, response) => {
    const { id: idProfesional } = request.params
    const { startDateTime, endDateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.idUser

    await ProfesionalsService.createProfesionalException({ idProfesional, startDateTime, endDateTime, description, createdBy })
    handleResponse({ response, statusCode: 201, message: 'Exception create successfully' })
}

const updateException = async (request, response) => {
    const { id: idProfesional, exception: idException } = request.params
    const { startDateTime, endDateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.idUser

    await ProfesionalsService.updateProfesionalException({ idProfesional, idException, startDateTime, endDateTime, description, modifiedBy })
    handleResponse({ response, statusCode: 200, message: 'Exception updated successfully' })
}

const deleteException = async (request, response) => {
    const { id: idProfesional, exception: idException } = request.params
    await ProfesionalsService.deleteProfesionalException({ idProfesional, idException })
    handleResponse({ response, statusCode: 200, message: 'Exception deleted successfully' })
}

const createReminder = async (request, response) => {
    const { id: idProfesional } = request.params
    const { idPatient, dateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.idUser

    await ProfesionalsService.createProfesionalReminder({ idProfesional, idPatient, dateTime, description, createdBy })
    handleResponse({ response, statusCode: 201, message: 'Reminder create successfully' })
}

const updateReminder = async (request, response) => {
    const { id: idProfesional, reminder: idReminder } = request.params
    const { dateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.idUser

    await ProfesionalsService.updateProfesionalReminder({ idProfesional, idReminder, dateTime, description, modifiedBy })
    handleResponse({ response, statusCode: 200, message: 'Reminder updated successfully' })
}

const deleteReminder = async (request, response) => {
    const { id: idProfesional, reminder: idReminder } = request.params
    await ProfesionalsService.deleteProfesionalReminder({ idProfesional, idReminder })
    handleResponse({ response, statusCode: 200, message: 'Reminder deleted successfully' })
}

const profesionalController = {
    getAllProfesionals: catchedAsync(getAllProfesionals),
    getProfesional: catchedAsync(getProfesional),
    getEvents: catchedAsync(getProfesionalEvents),
    getTreatments: catchedAsync(getProfesionalTreatments),
    getTreatment: catchedAsync(getProfesionalTreatment),
    createTreatment: catchedAsync(createTreatment),
    updateTreatment: catchedAsync(updateTreatment),
    deleteTreatment: catchedAsync(deleteTreatment),
    createAppointment: catchedAsync(createAppointment),
    updateAppointment: catchedAsync(updateAppointment),
    deleteAppointment: catchedAsync(deleteAppointment),
    createException: catchedAsync(createException),
    updateException: catchedAsync(updateException),
    deleteException: catchedAsync(deleteException),
    createReminder: catchedAsync(createReminder),
    updateReminder: catchedAsync(updateReminder),
    deleteReminder: catchedAsync(deleteReminder),
}

export default profesionalController