import { Router } from 'express'
import chargeController from '../controlers/charges.js'
import { checkAuth } from '../middleware/auth.js'
import { validateCreate } from '../validators/charge.js'

const router = Router()

router.get('/', chargeController.getAllCharges)
router.post('/', checkAuth, validateCreate, chargeController.createCharge)
router.patch('/:id', checkAuth, chargeController.updateCharge)
router.delete('/:id', checkAuth, chargeController.deleteCharge)

export { router }