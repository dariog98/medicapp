import { handleResponse } from '../helpers/handleResponse.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { AppointmentsService } from '../services/postgres/index.js'

const getAllAppointments = async (request, response) => {
    const {
        idPatient,
        idProfesional,
        idTreatment,
        status,
        page,
        startTime,
        endTime,
        rows,
        order: stringOrder,
    } = request.query

    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

    const { totalPages, data, total } = await AppointmentsService.getAllAppointments({
        idPatient,
        idProfesional,
        idTreatment,
        status,
        page,
        startTime,
        endTime,
        rows,
        order
    })

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const appointmentController = {
    getAllAppointments: catchedAsync(getAllAppointments)
}

export default appointmentController
