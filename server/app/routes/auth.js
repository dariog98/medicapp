import { Router } from 'express'
import { validateCreate } from '../validators/auth.js'
import { checkAuth } from '../middleware/auth.js'
import authenticationController from '../controlers/auth.js'

const router = Router()

router.post('/login', authenticationController.login)
router.post('/register', validateCreate, authenticationController.register)
router.patch('/update', checkAuth, authenticationController.update)
router.post('/resetpassword', authenticationController.resetPassword)

export { router }