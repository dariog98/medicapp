import { Router } from 'express'
import { createFile, deleteAllFiles, deleteFile, getFile, getThumbnail, updateFile } from '../controlers/files.js'
import { checkAuth } from '../middleware/auth.js'
import { uploadMiddleware } from '../middleware/storage.js'

const router = Router()

router.get('/:filename', checkAuth, getFile)
router.get('/thumbnail/:filename', checkAuth, getThumbnail)
router.post('/', checkAuth, uploadMiddleware.single('file'), createFile)
router.patch('/:id', checkAuth, uploadMiddleware.single('file'), updateFile)
router.delete('/:id', checkAuth, deleteFile)
router.delete('/all/delete', checkAuth, deleteAllFiles)

export { router }