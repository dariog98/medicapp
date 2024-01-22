import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { ChargesService } from '../services/postgres/index.js'

const getAllCharges = async (request, response) => {
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await ChargesService.getAllCharges({ search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const createCharge = async (request, response) => {
    const { description } = request.body
    const charge = await ChargesService.createCharge({ description })
    handleResponse({ response, statusCode: 201, message: 'Charge create successfully', charge })
}

const updateCharge = async (request, response) => {
    const { id: idCharge } = request.params
    const { description } = request.body
    await ChargesService.updateCharge({ idCharge, description })
    handleResponse({ response, statusCode: 200, message: 'Charge updated successfully' })
}

const deleteCharge = async (request, response) => {
    const { id: idCharge } = request.params
    await ChargesService.deleteCharge({ idCharge })
    handleResponse({ response, statusCode: 200, message: 'Charge deleted successfully' })
}

const chargeController = {
    getAllCharges: catchedAsync(getAllCharges),
    createCharge: catchedAsync(createCharge),
    updateCharge: catchedAsync(updateCharge),
    deleteCharge: catchedAsync(deleteCharge)
}

export default chargeController