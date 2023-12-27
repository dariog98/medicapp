import { newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const getAllTurns = async ({ idPatient, idProfesional, idTreatment, page, order }) => {
    const params = new URLSearchParams({
        page: page ?? 1,
        idPatient: idPatient ?? '',
        idProfesional: idProfesional ?? '',
        idTreatment: idTreatment ?? '',
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Turns}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const turnServices = {
    getAllTurns
}

export default turnServices