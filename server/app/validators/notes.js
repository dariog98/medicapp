import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateNote = [
    check('content')
        .exists()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

const validateUpdateNote = [
    check('id')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('content')
        .exists()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreateNote, validateUpdateNote }