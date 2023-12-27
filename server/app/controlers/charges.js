import { Op, ValidationErrorItem } from 'sequelize'
import { ClientError } from '../constants/errors.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'
import { Charge } from '../models/index.js'

const getAllCharges = async (request, response) => {
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    
    const { totalPages, data, total } = await paginatedQuery(Charge, 100, page, order, { description: { [Op.like]: `%${search ?? ''}%` } })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const createCharge = async (request, response) => {
    const { description } = request.body

    try {
        const charge = await Charge.create({ description })
        handleResponse({ response, statusCode: 201, message: 'Charge create successfully', charge })
    } catch (error) {
        const err = error.errors.pop()
        const errorList = {
            'description': new ClientError('Validation error: Description is duplicate', 409, 1062),
        }
        if (err instanceof ValidationErrorItem) {
            throw errorList[err.path]
        }
        throw new ServerError('Server error')
    }
}

const updateCharge = async (request, response) => {
    const { id } = request.params
    const { description } = request.body

    const charge = await Charge.findOne({ where: { id } })

    if (!charge) throw new ClientError('Charge is not found or does not exist', 404)

    try {
        await charge.update({ description })
        handleResponse({ response, statusCode: 200, message: 'Charge updated successfully', charge })
    } catch (error) {
        const err = error.errors.pop()
        const errorList = {
            'description': new ClientError('Validation error: Description is duplicate', 409, 1062),
        }
        if (err instanceof ValidationErrorItem) {
            throw errorList[err.path]
        }
        throw new ServerError('Server error')
    }
}

const deleteCharge = async (request, response) => {
    const { id: idCharge } = request.params
    const charge = await Charge.findOne({ where: { id: idCharge } })
    if (!charge) throw new ClientError('Charge is not found or does not exist', 404)
    await charge.destroy()
    handleResponse({ response, statusCode: 200, message: 'Charge deleted successfully' })
}

const chargeController = {
    getAllCharges: catchedAsync(getAllCharges),
    createCharge: catchedAsync(createCharge),
    updateCharge: catchedAsync(updateCharge),
    deleteCharge: catchedAsync(deleteCharge)
}

export default chargeController