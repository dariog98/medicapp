import { Router } from 'express'
import { getReminder, createReminder, updateReminder, deleteReminder, getAllReminders } from '../controlers/reminders.js'
import { checkAuth } from '../middleware/auth.js'
import { validateCreate, validateEdit } from '../validators/reminders.js'

const router = Router()

router.get('/', checkAuth, getAllReminders)
router.get('/:id', checkAuth, getReminder)
router.post('/', checkAuth, validateCreate, createReminder)
router.patch('/:id', checkAuth, validateEdit ,updateReminder)
router.delete('/:id', checkAuth, deleteReminder)

export { router }