import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

const validateCreate = [
    check('names')
        .exists()
        .not()
        .isEmpty(),
    check('surnames')
        .exists()
        .not().isEmpty(),
    check('username')
        .exists()
        .not()
        .isEmpty(),
    check('password')
        .exists()
        .not()
        .isEmpty()
        .isLength({ min: 8 }),
    check('mail')
        .exists()
        .not().isEmpty()
        .isEmail(),
    check('idRole')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),
    check('idCharge')
        .exists()
        .isNumeric()
        .not()
        .isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate }