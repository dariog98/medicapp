import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const getAllProfesionals = async ({ idPatient, search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        idPatient: idPatient ?? '',
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Profesionals}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getEvents = async ({ idProfesional, startTime, endTime }) => {
    const params = new URLSearchParams({
        startTime: startTime ?? '',
        //endTime: endTime ?? ''
    })

    const url = `${RouteAPI.Profesionals}/${idProfesional}/events?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createTurn = async ({ idProfesional, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/turns`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateTurn = async ({ idProfesional, idTurn, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/turns/${idTurn}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deleteTurn = async ({ idProfesional, idTurn }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/turns/${idTurn}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createException = async ({ idProfesional, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/exceptions`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateException = async ({ idProfesional, idException, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/exceptions/${idException}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deleteException = async ({ idProfesional, idException }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/exceptions/${idException}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createReminder = async ({ idProfesional, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/reminders`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateReminder = async ({ idProfesional, idReminder, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/reminders/${idReminder}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deleteReminder = async ({ idProfesional, idReminder }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/reminders/${idReminder}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getTreatments = async ({ idProfesional, search }) => {
    const params = new URLSearchParams({
        search: search ?? ''
    })

    const url = `${RouteAPI.Profesionals}/${idProfesional}/treatments?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createTreatment = async ({ idProfesional, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/treatments`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updateTreatment = async ({ idProfesional, idTreatment, data }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/treatments/${idTreatment}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deleteTreatment = async ({ idProfesional, idTreatment }) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/treatments/${idTreatment}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const profesionalServices = {
    getAllProfesionals,
    getEvents,
    getTreatments,
    createTurn,
    updateTurn,
    deleteTurn,
    createException,
    updateException,
    deleteException,
    createReminder,
    updateReminder,
    deleteReminder,
    createTreatment,
    updateTreatment,
    deleteTreatment,
}

export default profesionalServices