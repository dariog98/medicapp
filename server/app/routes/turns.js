import { Router } from 'express'
import turnsController from '../controlers/turns.js'
import { checkAuth} from '../middleware/auth.js'

const router = Router()
router.get('/', checkAuth, turnsController.getAllTurns)
/*
router.get('/reports', checkAuth, getReports)
router.get('/:id', checkAuth, getTurn)
router.post('/', checkTurns, validateCreate, createTurn)
router.patch('/:id', checkAuth, validateEdit ,updateTurn)
router.delete('/:id', checkAuth, deleteTurn)
router.post('/:id/confirm', checkAuth, confirmTurn)
*/
export { router }