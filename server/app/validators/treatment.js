import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateTreatment = [
    check('description')
        .exists()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

const validateUpdateTreatment = [
    check('id')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('description')
        .exists()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreateTreatment, validateUpdateTreatment }