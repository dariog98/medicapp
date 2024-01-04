import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { Role } from '../models/index.js'

const getAllRoles = async (request, response) => {
    const results = await Role.findAll()
    handleResponse({ response, statusCode: 200, data: results })
}

const rolesController = {
    getAllRoles: catchedAsync(getAllRoles)
}

export default rolesController