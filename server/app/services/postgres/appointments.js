import { Op } from 'sequelize'
import { Appointment } from '../../models/postgres/index.js'
import { paginatedQuery } from '../../utils/paginatedQuery.js'
import { snakeToCamelObject } from '../../utils/snakeToCamel.js'

const getAllAppointments = async ({ 
    idPatient,
    idProfesional,
    idTreatment,
    status,
    page,
    startTime,
    endTime,
    rows,
    order
}) => {
    const literal = {}
    if (startTime) literal.date_time = { [Op.gte]: startTime }
    if (endTime) literal.date_time = { ...literal['date_time'], [Op.lte]: endTime }

    const { totalPages, total, data } = await paginatedQuery(Appointment, rows, page, order, {
        id_patient: idPatient,
        id_profesional: idProfesional,
        id_treatment: idTreatment,
        status
    }, [ 'treatment', 'profesional', 'patient' ], literal)
    return { page, totalPages, total, data: data.map(appointment => snakeToCamelObject(appointment.get())) }
}

const appointmentsService = {
    getAllAppointments
}

export default appointmentsService