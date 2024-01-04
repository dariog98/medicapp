import express from 'express'
import { router as patientRouter } from './patients.js'
import { router as fileRouter } from './files.js'
import { router as authRouter } from './auth.js'
import { router as turnRouter } from './turns.js'
import { router as reminderRouter } from './reminders.js'
import { router as chargeRouter } from './charges.js'
import { router as profesionalRouter } from './profesionals.js'
import { router as userRouter } from './users.js'
import { router as rolesRouter } from './roles.js'
import { router as statRouter } from './stats.js'
import { ClientError } from '../constants/errors.js'

const router = express.Router()
router.use('/patients', patientRouter)
router.use('/files', fileRouter)
router.use('/auth', authRouter)
router.use('/charges', chargeRouter)
router.use('/profesionals', profesionalRouter)
router.use('/turns', turnRouter)
router.use('/reminders', reminderRouter)
router.use('/users', userRouter)
router.use('/roles', rolesRouter)
router.use('/stats', statRouter)

router.get('*', (request, response) => {
    throw new ClientError('Route not found', 404)
})

export default router