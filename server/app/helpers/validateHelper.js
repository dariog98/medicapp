import { validationResult } from 'express-validator'
import { ClientError } from '../constants/errors.js'

const validateResult = (request, response, next) => {
    try {
        validationResult(request).throw()
        next()
    } catch (error) {
        throw new ClientError('The request body is invalid', 403)
        /* const errors = error.array().map(error => `${error.param}: ${error.msg}`) */
    }
}

export { validateResult }