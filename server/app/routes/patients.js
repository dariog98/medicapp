import { Router } from 'express'
import patientController from '../controlers/patients.js'
import { validateCreate } from '../validators/patients.js'
import { validateCreateNote, validateUpdateNote } from '../validators/notes.js'
import { checkAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', checkAuth, patientController.getAllPatients)
router.get('/:id', checkAuth, patientController.getPatient)
router.post('/', checkAuth, validateCreate, patientController.createPatient)

router.get('/:id/files', checkAuth, patientController.getPatientFiles)
router.get('/:id/photos', checkAuth, patientController.getPatientPhotos)
router.get('/:id/turns', checkAuth, patientController.getPatientTurns)
router.get('/:id/notes', checkAuth, patientController.getPatientNotes)
router.get('/:id/treatments', checkAuth, patientController.getPatientTreatments)

/*
router.get('/dni/:dni', checkAuth, getPatientByDNI)
router.patch('/:id', checkAuth, updatePatient)
router.delete('/:id', checkAuth, deletePatient)
router.delete('/all/delete', checkAuth, deleteAllPatients)


router.post('/:id/notes', checkAuth, validateCreateNote, createPatientNote)
router.patch('/:id/notes/:note', checkAuth, validateUpdateNote, updatePatientNote)
router.delete('/:id/notes/:note', checkAuth, deletePatientNote)

*/

export { router }