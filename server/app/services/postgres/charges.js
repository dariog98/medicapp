import { Op, ValidationErrorItem } from 'sequelize'
import { Charge } from '../../models/postgres/index.js'
import { paginatedQuery } from '../../utils/paginatedQuery.js'
import { ClientError } from '../../constants/errors.js'

const getAllCharges = async ({ search, page, order }) => {    
    return await paginatedQuery(Charge, 100, page, order, { description: { [Op.like]: `%${search ?? ''}%` } })
}

const getCharge = async ({ idCharge }) => {
    return await Charge.findOne({ where: { id: idCharge } })
}

const createCharge = async ({ description }) => {
    try {
        return await Charge.create({ description })
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

const updateCharge = async ({ idCharge, description }) => {
    try {
        const charge = await Charge.findOne({ where: { id: idCharge } })
        return await charge.update({ description })
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

const deleteCharge = async ({ idCharge }) => {
    const charge = await Charge.findOne({ where: { id: idCharge } })
    return await charge.destroy()
}

const chargesService = {
    getAllCharges,
    getCharge,
    createCharge,
    updateCharge,
    deleteCharge
}

export default chargesService