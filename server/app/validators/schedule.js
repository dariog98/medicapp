import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'

const validateConfig = [
    check('idPro')
        .exists()
        .notEmpty()
        .isNumeric()
        .isInt()
        .not().isString(),
    check('idRole')
        .exists()
        .notEmpty()
        .isNumeric()
        .isInt(),
    check('idCharge')
        .exists()
        .notEmpty()
        .isNumeric()
        .isInt(),
    check('workdays.*.id')
        .exists()
        .notEmpty()
        .isNumeric()
        .isInt()
        .isLength({ max:11 })
        .matches('^[0-9]{1,11}$'),
    check('workdays.*.idDay')
        .exists()
        .notEmpty()
        .isNumeric()
        .isInt()
        .isLength({ max:1 })
        .matches('^[0-6]$'),
    check('workdays.*.enabled')
        .exists()
        .notEmpty()
        .isInt()
        .isNumeric(),
    check('workdays.*.worktimes.*.startTime')
        .exists()
        .notEmpty()
        .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'),
    check('workdays.*.worktimes.*.endTime')
        .exists()
        .notEmpty()
        .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateConfig }