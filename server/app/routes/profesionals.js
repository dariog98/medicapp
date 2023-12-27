import { Router } from 'express';
import profesionalController from '../controlers/profesionals.js';
import { checkAuth, checkUser } from '../middleware/auth.js';
import { validateCreateTreatment, validateUpdateTreatment } from '../validators/treatment.js';

const router = Router()

router.get('/', profesionalController.getAllProfesionals)
router.get('/:id', profesionalController.getProfesional)

/*
router.get('/:id/events', checkAuth, getProfesionalEvents)
router.post('/:id/config', checkUser, saveProfesionalScheduleConfig)

router.get('/:id/treatments', checkAuth, getProfesionalTreatments)
router.get('/:id/treatments/:treatment', checkAuth, getProfesionalTreatment)
router.post('/:id/treatments', checkUser, validateCreateTreatment, createProfesionalTreatment)
router.patch('/:id/treatments/:treatment', checkUser, validateUpdateTreatment,updateProfesionalTreatment)
router.delete('/:id/treatments/:treatment', checkUser, deleteProfesionalTreatment)
*/
export { router };