import { Router } from "express";
import { getException, createException, updateException, deleteException } from "../controlers/exceptions.js";
import { checkAuth } from "../middleware/auth.js";
import { validateCreate, validateEdit } from "../validators/exceptions.js";

const router = Router()

router.get('/:id', checkAuth, getException)
router.post('/', checkAuth, validateCreate, createException)
router.patch('/:id', checkAuth, validateEdit ,updateException)
router.delete('/:id', checkAuth, deleteException)

export { router };