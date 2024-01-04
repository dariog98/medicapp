import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { Reminder } from '../models/index.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'

const getAllReminders = async (request, response) => {
    const { idProfesional, idPatient, startTime, endTime, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

    const literal = {}

    if (startTime) {
        literal.dateTime = { [Op.gte]: startTime }
    }

    if (endTime) {
        literal.dateTime = { ...literal['dateTime'], [Op.lte]: endTime }
    }

    const { totalPages, data, total } = await paginatedQuery(Reminder, 100, page, order, {
        idPatient,
        idProfesional,
    }, [ 'createdByUser', 'modifiedByUser', 'profesional', 'patient' ], literal)

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}


const remindersController = {
    getAllReminders: catchedAsync(getAllReminders)
}

export default remindersController