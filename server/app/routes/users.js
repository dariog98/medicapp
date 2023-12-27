import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, getUserByUsername,updatePassword, activateUser, getUserByMail } from "../controlers/users.js";
import { checkAdmin, checkAuth, checkUser } from "../middleware/auth.js";
import { validateCreate, validateUpdatePass } from "../validators/users.js";

const router = Router()

router.get('/', checkAuth, getUsers)
router.get('/:id', checkAuth, getUser)
router.get('/username/:username',checkAuth, getUserByUsername)
router.get('/mail/:mail',checkAuth, getUserByMail)
router.post('/', checkAuth, validateCreate, createUser)
router.patch('/:id/updatePass', checkAuth, validateUpdatePass, updatePassword)
router.patch('/:id', checkAuth, updateUser)
router.put('/:id', checkAuth, updateUser)
router.delete('/:id', checkUser, deleteUser)
router.get('/:id/activate', checkAdmin, activateUser)

export { router };