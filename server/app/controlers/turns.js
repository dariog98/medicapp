import { BuenosAires, getDayInTimeZone, getStringDateInTimeZone, isDateTimeEnabled } from '../constants/time.js'
import { TURN_STATUS } from '../constants/turnstatus.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'
import { Turn } from '../models/index.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { Op } from 'sequelize'

const getAllTurns = async (request, response) => {
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

    const { totalPages, data, total } = await paginatedQuery(Turn, rows, page, order, {
        idPatient,
        idProfesional,
        idTreatment,
        status
    }, [ 'treatment', 'profesional', 'patient' ], literal)

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const createTurn = async (request, response) => {
    try {
        const { idProfesional, idPatient, idTreatment, dateTime, duration, description } =
            request.body
        const accessToken = await getTokenFromRequest(request)
        const createdBy = accessToken.id

        const worktimes = await NewWorktime.findAll({
            where: { idProfesional },
            raw: true,
        })

        if (!worktimes.length) {
            const httpStatus = 403
            const status = 50000
            const message = "The profesional doesn't have configured worktimes"
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        const day = getDayInTimeZone(new Date(dateTime), BuenosAires)
        const date = getStringDateInTimeZone(new Date(dateTime), BuenosAires)
        const wt = worktimes
            .filter((w) => w.idDay === day)
            .map((w) => ({
                startTime: new Date(
                    `${date}T${w.startTime}${BuenosAires.numeric}`
                ),
                endTime: new Date(`${date}T${w.endTime}${BuenosAires.numeric}`),
            }))

        if (!isDateTimeEnabled(new Date(dateTime), duration, wt)) {
            const httpStatus = 403
            const status = 50002
            const message = 'The turn is out of profesional worktimes'
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        Turn.create({
            createdBy,
            idProfesional,
            idPatient,
            idTreatment,
            dateTime,
            duration,
            description,
        })
            .then((result) => {
                const status = 201
                const message = 'Turn create successfully'
                handleResponse(response, status, message, result)
            })
            .catch((error) => {
                console.log({ error })
                if (
                    [50001, 23000].includes(Number(error?.original?.sqlState))
                ) {
                    const httpStatus = 409
                    const status = 50001
                    const message = `An error occurred while trying to create the turn: The chosen time and day are not available`
                    handleResponseCustomStatus(
                        response,
                        httpStatus,
                        status,
                        message
                    )
                } else {
                    const status = 500
                    const message = `An error occurred while trying to create the turn: ${error.message}`
                    handleResponse(response, status, message)
                }
            })
    } catch (error) {
        httpError(response, error)
    }
}

const updateTurn = async (request, response) => {
    try {
        const { id } = request.params
        const { idTreatment, dateTime, duration, description } = request.body
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        /* Check turn exists */
        const turn = await Turn.findOne({ where: { id } })
        const idProfesional = turn.idProfesional

        if (!turn) {
            const status = 404
            const message = 'Turn is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        /* Check Worktimes */
        const worktimes = await NewWorktime.findAll({
            where: { idProfesional },
            raw: true,
        })

        if (!worktimes.length) {
            const httpStatus = 403
            const status = 50000
            const message = "The profesional doesn't have configured worktimes"
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        const day = getDayInTimeZone(new Date(dateTime), BuenosAires)
        const date = getStringDateInTimeZone(new Date(dateTime), BuenosAires)
        const wt = worktimes
            .filter((w) => w.idDay === day)
            .map((w) => ({
                startTime: new Date(
                    `${date}T${w.startTime}${BuenosAires.numeric}`
                ),
                endTime: new Date(`${date}T${w.endTime}${BuenosAires.numeric}`),
            }))

        if (!isDateTimeEnabled(new Date(dateTime), duration, wt)) {
            const httpStatus = 403
            const status = 50002
            const message = 'The turn is out of profesional worktimes'
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        /* Update turn */
        await turn.update({ modifiedBy, idTreatment: idTreatment ?? null, dateTime, duration, description })

        const status = 200
        const message = 'Turn updated successfully'
        handleResponse(response, status, message, turn)
    } catch (error) {
        console.log({ error })
        if ([50001, 23000].includes(Number(error?.original?.sqlState))) {
            const httpStatus = 409
            const status = 50001
            const message = `An error occurred while trying to update the turn: The chosen time and day are not available`
            handleResponseCustomStatus(response, httpStatus, status, message)
        } else {
            const status = 500
            const message = `An error occurred while trying to update the turn: ${error.message}`
            handleResponse(response, status, message)
        }
        //httpError(response, error)
    }
}

const deleteTurn = async (request, response) => {
    try {
        const { id } = request.params

        const turn = await Turn.findOne({ where: { id } })

        if (!turn) {
            const status = 404
            const message = 'Turn is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await turn.destroy()

        const status = 200
        const message = 'Turn deleted successfully'
        handleResponse(response, status, message, turn)
    } catch (error) {
        console.log(error)
        httpError(response, error)
    }
}

const confirmTurn = async (request, response) => {
    try {
        const { id } = request.params
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        const turn = await Turn.findOne({ where: { id } })

        if (!turn) {
            const status = 404
            const message = 'Turn is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await turn.update({ status: TURN_STATUS.Confirmed })

        const status = 200
        const message = 'Turn updated successfully'
        handleResponse(response, status, message, turn)
    } catch (error) {
        console.log(error)
        if ([50001, 23000].includes(Number(error?.original?.sqlState))) {
            const httpStatus = 409
            const status = 50001
            const message = `An error occurred while trying to update the turn: The chosen time and day are not available`
            handleResponseCustomStatus(response, httpStatus, status, message)
        } else {
            const status = 500
            const message = `An error occurred while trying to update the turn: ${error.message}`
            handleResponse(response, status, message)
        }
        //httpError(response, error)
    }
}

const turnsController = {
    getAllTurns: catchedAsync(getAllTurns)
}

export default turnsController
