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


const profesionalServices = {
    getAllProfesionals,
    getEvents
}

export default profesionalServices