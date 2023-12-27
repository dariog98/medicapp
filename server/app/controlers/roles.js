import { httpError } from '../helpers/handleErrors.js'
import { handleResponse } from '../helpers/handleResponse.js'
import Roles from '../models/role.js'

const getRoles = async (request, response) => {
    try {
        const results = await Roles.findAll()
        const status = 200
        const message = ''
        handleResponse(response, status, message, results)
    } catch (error) {
        httpError(response, error)
    }
}

export { getRoles }