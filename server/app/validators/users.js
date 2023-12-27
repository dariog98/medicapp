import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreate = [
    check('username')
        .exists()
        .not()
        .isEmpty(),
    check('password')
        .exists()
        .not()
        .isEmpty(),
    check('names')
        .exists()
        .not()
        .isEmpty(),
    check('surnames')
        .exists()
        .not()
        .isEmpty(),
    check('mail')
        .exists()
        .isEmail()
        .isLength({ min: 8 }),
    check('phone')
        .exists()
        .not()
        .isEmpty(),
    check('idRole')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('idCharge')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

const validateUpdatePass = [
    check('id')
        .exists()
        .not().isEmpty()
        .isNumeric(),
    check('oldPassword')
        .exists()
        .isString()
        .not()
        .isEmpty(),
    check('newPassword')
        .exists()
        .isString()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate, validateUpdatePass }