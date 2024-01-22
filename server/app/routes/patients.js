import { Router } from 'express'
import { validateCreate } from '../validators/patients.js'
import { validateCreateNote, validateUpdateNote } from '../validators/notes.js'
import { checkAuth } from '../middleware/auth.js'
import { uploadMiddleware } from '../middleware/storage.js'
import patientController from '../controlers/patients.js'

const router = Router()

// Basics
router.get('/', checkAuth, patientController.getAllPatients)
router.get('/:id', checkAuth, patientController.getPatient)
router.post('/', checkAuth, validateCreate, patientController.createPatient)
router.patch('/:id', checkAuth, validateCreate, patientController.updatePatient)
router.delete('/:id', checkAuth, patientController.deletePatient)

// Files
router.get('/:id/files', checkAuth, patientController.getPatientFiles)

// Photos
router.get('/:id/photos', checkAuth, patientController.getPhotos)
router.post('/:id/photos', checkAuth, uploadMiddleware.single('file'), patientController.createPhoto)

// Notes
router.get('/:id/notes', checkAuth, patientController.getPatientNotes)
router.post('/:id/notes', checkAuth, validateCreateNote, patientController.createPatientNote)
router.patch('/:id/notes/:note', checkAuth, validateUpdateNote, patientController.updatePatientNote)
router.delete('/:id/notes/:note', checkAuth, patientController.deletePatientNote)

// Treatments
router.get('/:id/treatments', checkAuth, patientController.getPatientTreatments)

export { router }