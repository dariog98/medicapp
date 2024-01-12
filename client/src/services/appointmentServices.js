import { newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const getAllAppointments = async ({ idPatient, idProfesional, idTreatment, startTime, endTime, page, order }) => {
    const params = new URLSearchParams({
        page: page ?? 1,
        idPatient: idPatient ?? '',
        idProfesional: idProfesional ?? '',
        idTreatment: idTreatment ?? '',
        startTime: startTime ?? '',
        endTime: endTime ?? '',
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Appointments}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const appointmentServices = {
    getAllAppointments
}

export default appointmentServices