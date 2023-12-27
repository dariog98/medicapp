import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'

const validateCreate = [
    check('idProfesional')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),
    check('dateTime')
        .exists()
        .isISO8601(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

const validateEdit = [
    check('id')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),
    check('dateTime')
        .exists()
        .isISO8601(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate, validateEdit }