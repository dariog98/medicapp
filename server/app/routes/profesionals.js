import { Router } from 'express'
import { checkAuth, checkUser } from '../middleware/auth.js'
import { validateCreateTreatment, validateUpdateTreatment } from '../validators/treatment.js'
import profesionalController from '../controlers/profesionals.js'

const router = Router()

router.get('/', checkAuth, profesionalController.getAllProfesionals)
router.get('/:id', checkAuth, profesionalController.getProfesional)

// Treatments
router.get('/:id/treatments', checkAuth, profesionalController.getTreatments)
router.get('/:id/treatments/:treatment', checkAuth, profesionalController.getTreatment)
router.post('/:id/treatments', checkUser, validateCreateTreatment, profesionalController.createTreatment)
router.patch('/:id/treatments/:treatment', checkUser, validateUpdateTreatment,profesionalController.updateTreatment)
router.delete('/:id/treatments/:treatment', checkUser, profesionalController.deleteTreatment)

// Events
router.get('/:id/events', checkAuth, profesionalController.getEvents)

// Appointments
router.post('/:id/appointments', checkAuth, profesionalController.createAppointment)
router.patch('/:id/appointments/:appointment', checkAuth, profesionalController.updateAppointment)
router.delete('/:id/appointments/:appointment', checkAuth, profesionalController.deleteAppointment)

// Exceptions
router.post('/:id/exceptions', checkAuth, profesionalController.createException)
router.patch('/:id/exceptions/:exception', checkAuth, profesionalController.updateException)
router.delete('/:id/exceptions/:exception', checkAuth, profesionalController.deleteException)

// Reminders
router.post('/:id/reminders', checkAuth, profesionalController.createReminder)
router.patch('/:id/reminders/:reminder', checkAuth, profesionalController.updateReminder)
router.delete('/:id/reminders/:reminder', checkAuth, profesionalController.deleteReminder)

export { router }