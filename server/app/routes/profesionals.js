import { Router } from 'express';
import profesionalController from '../controlers/profesionals.js';
import { checkAuth, checkUser } from '../middleware/auth.js';
import { validateCreateTreatment, validateUpdateTreatment } from '../validators/treatment.js';

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

// Configuration
router.post('/:id/config', checkUser, profesionalController.saveScheduleConfig)

/*

*/
export { router };