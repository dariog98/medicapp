import { Op } from 'sequelize'
import { handleResponse } from '../helpers/handleResponse.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'
import { Appointment } from '../models/index.js'
import { catchedAsync } from '../helpers/catchedAsync.js'

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

    const literal = {}

    if (startTime) {
        literal.dateTime = { [Op.gte]: startTime }
    }

    if (endTime) {
        literal.dateTime = { ...literal['dateTime'], [Op.lte]: endTime }
    }

    const { totalPages, data, total } = await paginatedQuery(Appointment, rows, page, order, {
        idPatient,
        idProfesional,
        idTreatment,
        status
    }, [ 'treatment', 'profesional', 'patient' ], literal)

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const appointmentController = {
    getAllAppointments: catchedAsync(getAllAppointments)
}

export default appointmentController
