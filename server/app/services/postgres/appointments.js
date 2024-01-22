import { Op } from 'sequelize'
import { Appointment } from '../../models/postgres/index.js'
import { paginatedQuery } from '../../utils/paginatedQuery.js'

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

    return await paginatedQuery(Appointment, rows, page, order, {
        id_patient: idPatient,
        id_profesional: idProfesional,
        id_treatment: idTreatment,
        status
    }, [ 'treatment', 'profesional', 'patient' ], literal)
}

const appointmentsService = {
    getAllAppointments
}

export default appointmentsService