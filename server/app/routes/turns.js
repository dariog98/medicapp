import { Router } from 'express'
import turnsController from '../controlers/turns.js'
import { checkAuth} from '../middleware/auth.js'

const router = Router()
router.get('/', checkAuth, turnsController.getAllTurns)

export { router }