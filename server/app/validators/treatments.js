import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'

const validateCreate = [
    check('description')
        .exists()
        .not()
        .isEmpty(),
    //check('price')
    //    .isNumeric(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

const validateUpdate = [
    check('id')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('description')
        .exists()
        .not()
        .isEmpty(),
    //check('price')
    //    .isNumeric(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate, validateUpdate }