import { newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const getAllReminders = async ({ idPatient, idProfesional, startTime, endTime, page, order }) => {
    const params = new URLSearchParams({
        page: page ?? 1,
        idPatient: idPatient ?? '',
        idProfesional: idProfesional ?? '',
        startTime: startTime ?? '',
        endTime: endTime ?? '',
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Reminders}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const reminderServices = {
    getAllReminders
}

export default reminderServices