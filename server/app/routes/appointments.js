import { Router } from 'express'
import { checkAuth} from '../middleware/auth.js'
import appointmentController from '../controlers/appointments.js'

const router = Router()
router.get('/', checkAuth, appointmentController.getAllAppointments)

export { router }