import { sequelize } from '../config/mysql.js'
import { TURN_STATUS } from '../constants/turnstatus.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import { Exception, Reminder, Treatment, Turn, User } from '../models/index.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'

const getAllProfesionals = async (request, response) => {
    const { search, page, order: stringOrder } = request.query

    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await paginatedQuery(User, 100, page, order, { idRole: 1 })

    handleResponse({ response, statusCode: 200, data, total, totalPages})
}

const getProfesional = async (request, response) => {
    const { id } = request.params
    const profesional = await User.findByPk(id, { include: ['role', 'charge'] })

    if (!profesional) throw new ClientError('Profesional not found', 404)

    handleResponse({response, statusCode: 200, data: profesional })
}

const getProfesionalEvents = async (request, response) => {
    try {
        const id = request.params.id
        const startTime = new Date(request.query.startTime)
        const endTime = request.query.endTime ? new Date(request.query.endTime) : new Date(
            Date.UTC(
                startTime.getUTCFullYear(),
                startTime.getUTCMonth(),
                startTime.getUTCDate(),
                startTime.getUTCHours() + 23,
                startTime.getUTCMinutes() + 59,
            )
        )
        const turns = await Turn.getByProfesionalID(id, startTime, endTime)
        const exceptions = await Exception.getByProfesionalID(id, startTime, endTime)
        const reminders = await Reminder.getByProfesionalID(id, startTime, endTime)
        const result = [
            ...turns.map(turn => {
                const data = JSON.parse(JSON.stringify(turn))
                const startTime = new Date(data.dateTime)
                const [hours, minutes] = data.duration.split(':')
                const endTime = new Date(Date.UTC(
                    startTime.getUTCFullYear(),
                    startTime.getUTCMonth(),
                    startTime.getUTCDate(),
                    startTime.getUTCHours() + parseInt(hours),
                    startTime.getUTCMinutes() + parseInt(minutes)
                ))
                const duration = data.duration.slice(0, 5)

                const type = 'turn'
                return {
                    ...data,
                    duration,
                    startTime,
                    endTime,
                    type
                }
            }),
            ...exceptions.map(exception => {
                const data = JSON.parse(JSON.stringify(exception))
                const type = 'exception'
                return {
                    ...data,
                    startTime: data.startDateTime,
                    endTime: data.endDateTime,
                    type
                }
            }),
            ...reminders.map(exception => {
                const data = JSON.parse(JSON.stringify(exception))
                const type = 'reminder'
                return {
                    ...data,
                    startTime: data.dateTime,
                    type
                }
            })
        ]

        const status = 200
        const message = ''
        handleResponse(response, status, message, result)
    } catch (error) {
        console.log(error)
        httpError(response, error)
    }
}

const deleteAllProfesionalsEvents = async (request, response) => {
    try {
        await Turn.destroy({ where: {}, truncate: true })
        await Exception.destroy({ where: {}, truncate: true })
        await Reminder.destroy({ where: {}, truncate: true })

        const status = 200
        const message = 'All events deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
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
    try {
        const { id: idProfesional } = request.params
        const { order: stringOrder, search, page } = request.query
        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

        const {total_pages, results: data } = await Treatment.getPage({ idProfesional, search: search ? search : '', order,  page: page ? page - 1 : 0 })

        const status = 200
        const message = ''
        response.send({ status, message, data, total_pages })
    } catch (error) {
        httpError(response, error)
    }
}

const getProfesionalTreatment = async (request, response) => {
    try {
        const { id: idProfesional, treatment: idTreatment } = request.params

        const treatment = await Treatment.findOne({ where: { idProfesional, id: idTreatment }})

        if (!treatment) {
            const status = 404
            const message = 'Treatment is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        const status = 200
        const message = ''
        handleResponse(response, status, message, treatment)
    } catch (error) {
        httpError(response, error)
    }
}

const getProfesionalTreatmentsResume = async (request, response) => {
    try {
        const { idProfesional } = request.query

        const query = `
            select year(addtime(turns.dateTime, '-03:00:00')) as year, month(addtime(turns.dateTime, '-03:00:00')) as month, count(idTreatment) as total
            from turns
            where turns.idProfesional = ${Number(idProfesional)} and turns.status = ${TURN_STATUS.Confirmed}
            group by year(addtime(turns.dateTime, '-03:00:00')), month(addtime(turns.dateTime, '-03:00:00'))
            order by year desc, month asc
        `
        const [results] = await sequelize.query(query)

        const dataIndexed = results.reduce((accumulator, current) => {
            if (!accumulator[current.year]) {
                accumulator[current.year] = {}
            }
            accumulator[current.year][current.month] = current.total
            return accumulator
        }, {})
        
        const data = Object.keys(dataIndexed).map(year => {
            let yearTotalTreatments = 0
            const treatments =  Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                const monthTotal = dataIndexed[year][month] ?? 0
                yearTotalTreatments += monthTotal
                return { month, total: monthTotal }
            })
            return { year: Number(year), treatments, total: yearTotalTreatments }
        }).sort((a, b) => a.year < b.year ? 1 : -1)

        const status = 200
        const message = ''
        handleResponse(response, status, message, data)
    } catch (error) {
        httpError(response, error)
    }
}

const createProfesionalTreatment = async (request, response) => {
    try {
        const { id: idProfesional } = request.params
        const { description, price } = request.body

        Treatment.create({ idProfesional, description })
        .then(result => {
            const status = 201
            const message = 'Treatment create successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            console.log(error)
            const errorNumber = Number(error?.original?.errno)
            if (errorNumber === 1062) {
                const httpStatus = 409
                const status = 1062
                const message = 'Description duplicate'
                handleResponseCustomStatus(response, httpStatus, status, message)
                return
            }
            const status = 500
            const message = `An error occurred while trying to create the treatment: ${error.errors}`
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updateProfesionalTreatment = async (request, response) => {
    try {
        const { id: idProfesional, treatment: idTreatment } = request.params
        const { description, price } = request.body

        const treatment = await Treatment.findOne({ where: { id: idTreatment, idProfesional } })

        if (!treatment) {
            const status = 404
            const message = 'Treatment is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await treatment.update({ description })

        const status = 200
        const message = 'Treatment updated successfully'
        handleResponse(response, status, message, treatment)
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1062) {
            const httpStatus = 409
            const status = 1062
            const message = 'Description duplicate'
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }
        httpError(response, error)
    }
}

const deleteProfesionalTreatment = async (request, response) => {
    try {
        const { id: idProfesional, treatment: idTreatment } = request.params

        const treatment = await Treatment.findOne({ where: { id: idTreatment, idProfesional } })

        if (!treatment) {
            const status = 404
            const message = 'Treatment is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await treatment.destroy()

        const status = 200
        const message = 'Treatment deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1451) {
            const httpStatus = 409
            const status = 1451
            const message = `Can't eliminate treatment`
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }
        httpError(response, error)
    }
}

const getProfesionalEarnings = async (request, response) => {
    try {
        const { idProfesional } = request.query

        const query = `
            select year(addtime(turns.dateTime, '-03:00:00')) as year, month(addtime(turns.dateTime, '-03:00:00')) as month, sum(treatments.price) as total
            from turns
            left join treatments on turns.idTreatment = treatments.id
            where turns.idProfesional = ${Number(idProfesional)} and turns.status = ${TURN_STATUS.Confirmed}
            group by year(addtime(turns.dateTime, '-03:00:00')), month(addtime(turns.dateTime, '-03:00:00'))
            order by year desc, month asc
        `
        
        const [results] = await sequelize.query(query)

        const dataIndexed = results.reduce((accumulator, current) => {
            if (!accumulator[current.year]) {
                accumulator[current.year] = {}
            }
            accumulator[current.year][current.month] = current.total
            return accumulator
        }, {})

        const data = Object.keys(dataIndexed).map(year => {
            let yearTotalEarnings = 0
            const earnings =  Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                const monthTotal = dataIndexed[year][month] ?? 0
                yearTotalEarnings += monthTotal
                return { month, total: monthTotal }
            })
            return { year: Number(year), earnings, total: yearTotalEarnings }
        }).sort((a, b) => a.year < b.year ? 1 : -1)

        const status = 200
        const message = ''
        handleResponse(response, status, message, data)
    } catch (error) {
        httpError(response, error)
    }
}

const profesionalController = {
    getAllProfesionals: catchedAsync(getAllProfesionals),
    getProfesional: catchedAsync(getProfesional),
    getProfesionalEvents,
    deleteAllProfesionalsEvents,
    saveProfesionalScheduleConfig,
    getProfesionalTreatments,
    getProfesionalTreatmentsResume,
    getProfesionalTreatment,
    createProfesionalTreatment,
    updateProfesionalTreatment,
    deleteProfesionalTreatment,
    getProfesionalEarnings
}

export default profesionalController