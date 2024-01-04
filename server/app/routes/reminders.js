import { Router } from 'express'
import { checkAuth } from '../middleware/auth.js'
import remindersController from '../controlers/reminders.js'

const router = Router()

router.get('/', checkAuth, remindersController.getAllReminders)

export { router }