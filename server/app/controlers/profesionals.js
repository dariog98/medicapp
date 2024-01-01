import { Op, Sequelize } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import { TURN_STATUS } from '../constants/turnstatus.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { Exception, Reminder, Treatment, Turn, User } from '../models/index.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'
import { ClientError, ServerError } from '../constants/errors.js'

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
            return { type: 'expception', startTime: exception.startDateTime, endTime: exception.endDateTime, ...exception }
        }),
        ...reminders.map(r => {
            const reminder = r.get()
            return { type: 'reminder', startTime: reminder.dateTime, ...reminder }
        })
    ]

    handleResponse({ response, statusCode: 200, data })
}

const getSecondsOfTime = (time) => {
    const [hours, minutes] = time.split(':')
    return (Number(hours) * 60 + Number(minutes)) * 60
}

const checkCollapse = (worktimes, newWorktime) => {
    for (let index = 0; index < worktimes.length; index++) {
        const w = worktimes[index]
        const worktimeStartTime = getSecondsOfTime('24:00') * w.idDay + getSecondsOfTime(w.startTime)
        const worktimeEndTime   = getSecondsOfTime('24:00') * w.idDay + getSecondsOfTime(w.endTime)
        const newWorktimeStartTime = getSecondsOfTime('24:00') * newWorktime.idDay + getSecondsOfTime(newWorktime.startTime)
        const newWorktimeEndTime   = getSecondsOfTime('24:00') * newWorktime.idDay + getSecondsOfTime(newWorktime.endTime)

        const isCollapse = (
            (newWorktimeStartTime < worktimeStartTime && newWorktimeEndTime > worktimeStartTime) ||
            (newWorktimeEndTime >= worktimeEndTime && newWorktimeStartTime < worktimeEndTime) ||
            (newWorktimeStartTime >= worktimeStartTime && newWorktimeEndTime <= worktimeEndTime)
        )

        if (isCollapse) {
            return true
        }
    }

    return false
}

const saveProfesionalScheduleConfig = async (request, response) => {
    const transaction = await sequelize.transaction()

    try {
        const id = request.params.id
        const { worktimes } = request.body

        if (worktimes.length === 0) {
            const status = 401
            const message = 'Worktimes list is empty'
            handleResponse(response, status, message)
            return
        }

        for (let index = 0; index < worktimes.length; index++) {
            const worktime = worktimes[index]

            if (getSecondsOfTime(worktime.startTime) >= getSecondsOfTime(worktime.endTime)) {
                console.log(worktime)
                const status = 401
                const message = "startTime can'be greater than or equal to endTime"
                handleResponse(response, status, message)
                return
            }

            const filterList = worktimes.filter((_, i) => i !== index)

            if (checkCollapse(filterList, worktime)) {
                const status = 401
                const message = 'Worktimes collapse'
                handleResponse(response, status, message)
                return
            }
        }

        await NewWorktime.destroy({ where: { idProfesional: id }, transaction })

        const rows = worktimes.map(worktime => ({ idProfesional: id, idDay: worktime.idDay, startTime: worktime.startTime, endTime: worktime.endTime }))

        const config = await NewWorktime.bulkCreate(
            rows,
            { transaction }
        )

        await transaction.commit()
        const status = 200
        const data = { worktimes: config }
        const message = 'Profesional schedule configuration saved succesfully'
        handleResponse(response, status, message, data)
    } catch (error) {
        await transaction.rollback()
        httpError(response, error)
    }
}

const getProfesionalTreatments = async (request, response) => {
    const { id: idProfesional } = request.params
    const { order: stringOrder, search, page } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

    const { totalPages, data, total } = await paginatedQuery(User, 100, page, order, { idProfesional }, [], {
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

const profesionalController = {
    getAllProfesionals: catchedAsync(getAllProfesionals),
    getProfesional: catchedAsync(getProfesional),
    getEvents: catchedAsync(getProfesionalEvents),
    saveScheduleConfig: catchedAsync(saveProfesionalScheduleConfig),
    getTreatments: catchedAsync(getProfesionalTreatments),
    getTreatment: catchedAsync(getProfesionalTreatment),
    createTreatment: catchedAsync(createProfesionalTreatment),
    updateTreatment: catchedAsync(updateProfesionalTreatment),
    deleteTreatment: catchedAsync(deleteProfesionalTreatment),
}

export default profesionalController