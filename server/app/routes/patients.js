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
router.patch('/:id/photos/:photo', checkAuth, uploadMiddleware.single('file'), patientController.updatePhoto)
router.delete('/:id/photos/:photo', checkAuth, patientController.deletePhoto)

// Notes
router.get('/:id/notes', checkAuth, patientController.getNotes)
router.post('/:id/notes', checkAuth, validateCreateNote, patientController.createNote)
router.patch('/:id/notes/:note', checkAuth, validateUpdateNote, patientController.updateNote)
router.delete('/:id/notes/:note', checkAuth, patientController.deleteNote)

// Treatments
router.get('/:id/treatments', checkAuth, patientController.getPatientTreatments)

export { router }