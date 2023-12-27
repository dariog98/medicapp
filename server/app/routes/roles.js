import { Router } from "express";
import { getRoles } from "../controlers/roles.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router()

router.get('/', checkAuth, getRoles)

export { router };