import { Op, Sequelize } from 'sequelize'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { Exception, Reminder, Treatment, Turn, User } from '../models/index.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'
import { ClientError, ServerError } from '../constants/errors.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'

const getAllProfesionals = async (request, response) => {
    const { search, page, order: stringOrder } = request.query

    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await paginatedQuery(User, 100, page, order, { idRole: 1 }, [],
    {
        [Op.or]: [
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), { [Op.like]: `%${search ?? ''}%` }),
            { username: { [Op.like]: `%${search ?? ''}%` } }
        ]
    })
    handleResponse({ response, statusCode: 200, data, total, totalPages})
}

const getProfesional = async (request, response) => {
    const { id } = request.params
    const profesional = await User.findByPk(id, { include: ['role', 'charge'] })

    if (!profesional) throw new ClientError('Profesional not found', 404)

    handleResponse({response, statusCode: 200, data: profesional })
}

const getProfesionalEvents = async (request, response) => {
    const { id: idProfesional } = request.params
    const startTime = request.query.startTime ? new Date(request.query.startTime) : new Date()
    const endTime = request.query.endTime ? new Date(request.query.endTime) : new Date(
        Date.UTC(
            startTime.getUTCFullYear(),
            startTime.getUTCMonth(),
            startTime.getUTCDate(),
            startTime.getUTCHours() + 23,
            startTime.getUTCMinutes() + 59,
        )
    )

    const turns = await Turn.findAll({
        where: { idProfesional, dateTime: { [Op.between]: [startTime, endTime] } },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient', 'treatment'],
    })

    const exceptions = await Exception.findAll({
        where: { idProfesional, startDateTime: { [Op.lte]: endTime }, endDateTime: { [Op.gte]: startTime } },
        include: ['createdByUser', 'modifiedByUser', 'profesional'],
    })

    const reminders = await Reminder.findAll({
        where: { idProfesional, dateTime: { [Op.between]: [startTime, endTime] } },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient'],
    })

    const data = [
        ...turns.map(t => {
            const turn = t.get()

            const startTime = new Date(turn.dateTime)
            const [hours, minutes] = turn.duration.split(':')
            const endTime = new Date(Date.UTC(
                startTime.getUTCFullYear(),
                startTime.getUTCMonth(),
                startTime.getUTCDate(),
                startTime.getUTCHours() + parseInt(hours),
                startTime.getUTCMinutes() + parseInt(minutes)
            ))

            return { type: 'turn', startTime, endTime, ...turn }
        }),
        ...exceptions.map(ex => {
            const exception = ex.get()
            return { type: 'exception', startTime: exception.startDateTime, endTime: exception.endDateTime, ...exception }
        }),
        ...reminders.map(r => {
            const reminder = r.get()
            return { type: 'reminder', startTime: reminder.dateTime, ...reminder }
        })
    ]

    handleResponse({ response, statusCode: 200, data })
}

const getProfesionalTreatments = async (request, response) => {
    const { id: idProfesional } = request.params
    const { order: stringOrder, search, page } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

    const { totalPages, data, total } = await paginatedQuery(Treatment, 100, page, order, { idProfesional }, [], {
        description: { [Op.like]: `%${search ?? ''}%` }
    })

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getProfesionalTreatment = async (request, response) => {
    const { id: idProfesional, treatment: idTreatment } = request.params
    const treatment = await Treatment.findOne({ where: { idProfesional, id: idTreatment }})
    if (!treatment) throw new ClientError('Treatment is not found or does not exist', 404)
    handleResponse({response, statusCode: 200, data: treatment})
}

const createProfesionalTreatment = async (request, response) => {
    const { id: idProfesional } = request.params
    const { description } = request.body

    await Treatment.create({ idProfesional, description })
    .then(() => {
        handleResponse({ response, statusCode: 201, message: 'Treatment create successfully' })
    })
    .catch(error => {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1062) throw new ClientError('Description duplicate', 409, 1062)
        throw new ServerError('An error occurred while trying to create the treatment', 500)
    })
}

const updateProfesionalTreatment = async (request, response) => {
    const { id: idProfesional, treatment: idTreatment } = request.params
    const { description } = request.body

    const treatment = await Treatment.findOne({ where: { id: idTreatment, idProfesional } })

    if (!treatment) throw new ClientError('Treatment is not found or does not exist', 404)

    treatment.update({ description })
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Treatment updated successfully' })
    })
    .catch(error => {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1062) throw new ClientError('Description duplicate', 409, 1062)
        throw new ServerError('An error occurred while trying to update the treatment', 500)
    })
}

const deleteProfesionalTreatment = async (request, response) => {
    const { id: idProfesional, treatment: idTreatment } = request.params

    const treatment = await Treatment.findOne({ where: { id: idTreatment, idProfesional } })

    if (!treatment) throw new ClientError('Treatment is not found or does not exist', 404)

    treatment.destroy()
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Treatment deleted successfully' })
    })
    .catch(error => {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1451) throw new ClientError("The treatment can't be deleted since it was assigned to a turn", 409, 1451)
        throw new ServerError('An error occurred while trying to delete the treatment', 500)
    })
}

const createTurn = async (request, response) => {
    const { id: idProfesional } = request.params
    const { idPatient, dateTime, duration, idTreatment, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.idUser

    await Turn.create({ idProfesional, idPatient, dateTime, duration, idTreatment, description, createdBy })
    .then(() => {
        handleResponse({ response, statusCode: 201, message: 'Turn create successfully' })
    })
    .catch(error => {
        console.log(error)
        throw new ServerError('An error occurred while trying to create the turn', 500)
    })
}

const updateTurn = async (request, response) => {
    const { id: idProfesional, turn: idTurn } = request.params
    const { dateTime, duration, idTreatment, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.idUser

    const turn = await Turn.findOne({ where: { idProfesional, id: idTurn } })
    if (!turn) throw new ClientError('Turn was not found or does not exist', 404)

    turn.update({ dateTime, duration, idTreatment: idTreatment ?? null, description, modifiedBy })
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Turn updated successfully' })
    })
    .catch(error => {
        throw new ServerError('An error occurred while trying to update the turn', 500)
    })
}

const deleteTurn = async (request, response) => {
    const { id: idProfesional, turn: idTurn } = request.params

    const turn = await Turn.findOne({ where: { idProfesional, id: idTurn } })
    if (!turn) throw new ClientError('Turn was not found or does not exist', 404)

    turn.destroy()
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Turn deleted successfully' })
    })
    .catch(error => {
        throw new ServerError('An error occurred while trying to delete the turn', 500)
    })
}

const createException = async (request, response) => {
    const { id: idProfesional } = request.params
    const { startDateTime, endDateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.idUser

    await Exception.create({ idProfesional, startDateTime, endDateTime, description, createdBy })
    .then(() => {
        handleResponse({ response, statusCode: 201, message: 'Exception create successfully' })
    })
    .catch(error => {
        console.log(error)
        throw new ServerError('An error occurred while trying to create the excepion', 500)
    })
}

const updateException = async (request, response) => {
    const { id: idProfesional, exception: idException } = request.params
    const { startDateTime, endDateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.idUser

    const exception = await Exception.findOne({ where: { idProfesional, id: idException } })
    if (!exception) throw new ClientError('Exception was not found or does not exist', 404)

    exception.update({ startDateTime, endDateTime, description, modifiedBy })
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Exception updated successfully' })
    })
    .catch(error => {
        throw new ServerError('An error occurred while trying to update the exception', 500)
    })
}

const deleteException = async (request, response) => {
    const { id: idProfesional, exception: idException } = request.params

    const exception = await Exception.findOne({ where: { idProfesional, id: idException } })
    if (!exception) throw new ClientError('Exception was not found or does not exist', 404)

    exception.destroy()
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Exception deleted successfully' })
    })
    .catch(error => {
        throw new ServerError('An error occurred while trying to delete the exception', 500)
    })
}

const createReminder = async (request, response) => {
    const { id: idProfesional } = request.params
    const { idPatient, dateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.idUser

    await Reminder.create({ idProfesional, idPatient, dateTime, description, createdBy })
    .then(() => {
        handleResponse({ response, statusCode: 201, message: 'Reminder create successfully' })
    })
    .catch(error => {
        console.log(error)
        throw new ServerError('An error occurred while trying to create the reminder', 500)
    })
}

const updateReminder = async (request, response) => {
    const { id: idProfesional, reminder: idReminder } = request.params
    const { dateTime, description } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.idUser

    const reminder = await Reminder.findOne({ where: { idProfesional, id: idReminder } })
    if (!reminder) throw new ClientError('Reminder was not found or does not exist', 404)

    reminder.update({ dateTime, description, modifiedBy })
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Reminder updated successfully' })
    })
    .catch(error => {
        throw new ServerError('An error occurred while trying to update the reminder', 500)
    })
}

const deleteReminder = async (request, response) => {
    const { id: idProfesional, reminder: idReminder } = request.params

    const reminder = await Reminder.findOne({ where: { idProfesional, id: idReminder } })
    if (!reminder) throw new ClientError('Reminder was not found or does not exist', 404)

    reminder.destroy()
    .then(() => {
        handleResponse({ response, statusCode: 200, message: 'Reminder deleted successfully' })
    })
    .catch(error => {
        throw new ServerError('An error occurred while trying to delete the reminder', 500)
    })
}

const profesionalController = {
    getAllProfesionals: catchedAsync(getAllProfesionals),
    getProfesional: catchedAsync(getProfesional),
    getEvents: catchedAsync(getProfesionalEvents),
    getTreatments: catchedAsync(getProfesionalTreatments),
    getTreatment: catchedAsync(getProfesionalTreatment),
    createTreatment: catchedAsync(createProfesionalTreatment),
    updateTreatment: catchedAsync(updateProfesionalTreatment),
    deleteTreatment: catchedAsync(deleteProfesionalTreatment),
    createTurn: catchedAsync(createTurn),
    updateTurn: catchedAsync(updateTurn),
    deleteTurn: catchedAsync(deleteTurn),
    createException: catchedAsync(createException),
    updateException: catchedAsync(updateException),
    deleteException: catchedAsync(deleteException),
    createReminder: catchedAsync(createReminder),
    updateReminder: catchedAsync(updateReminder),
    deleteReminder: catchedAsync(deleteReminder),
}

export default profesionalController