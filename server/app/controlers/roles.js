import { catchedAsync } from '../helpers/catchedAsync.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { RolesService } from '../services/postgres/index.js'

const getAllRoles = async (request, response) => {
    const data = await RolesService.getAllRoles()
    handleResponse({ response, statusCode: 200, data })
}

const rolesController = {
    getAllRoles: catchedAsync(getAllRoles)
}

export default rolesController