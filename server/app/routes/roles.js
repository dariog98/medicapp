import { Router } from 'express'
import rolesController from '../controlers/roles.js'
import { checkAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', checkAuth, rolesController.getAllRoles)

export { router };