import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { RemindersService } from '../services/postgres/index.js'

const getAllReminders = async (request, response) => {
    const { idProfesional, idPatient, startTime, endTime, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await RemindersService.getAllReminders({ idPatient, idProfesional, startTime, endTime, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const remindersController = {
    getAllReminders: catchedAsync(getAllReminders)
}

export default remindersController