import { Op } from 'sequelize'
import { paginatedQuery } from '../../utils/paginatedQuery.js'
import { Reminder } from '../../models/postgres/index.js'

const getAllReminders = async ({ idProfesional, idPatient, startTime, endTime, page, order }) => {
    const literal = {}
    //if (startTime) literal.date_time = { [Op.gte]: startTime }
    //if (endTime) literal.date_time = { ...literal['date_time'], [Op.lte]: endTime }

    return await paginatedQuery(Reminder, 100, page, order, {
        id_patient: idPatient,
        id_profesional: idProfesional,
    }, [ 'createdByUser', 'modifiedByUser', 'profesional', 'patient' ], literal)
}

const remindersService = {
    getAllReminders
}

export default remindersService