import { check } from 'express-validator';
import { validateResult } from '../helpers/validateHelper.js';

const validateCreate = [
    check('names')
        .exists()
        .not().isEmpty()
        .isString(),
    check('surnames')
        .exists()
        .not().isEmpty()
        .isString(),
    check('dni')
        .exists()
        .isNumeric()
        .isLength({ min: 8 }),
    check('birthdate')
        .exists()
        .not().isEmpty()
        .isISO8601(),
    check('phone')
        .exists()
        .not().isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate }