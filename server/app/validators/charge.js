import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreate = [
    check('description')
        .exists()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate }