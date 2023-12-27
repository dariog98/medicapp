import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
//import { getProfesionalEarnings, getProfesionalTreatmentsResume } from "../controlers/profesionals.js";
//import { getPatientsResume } from "../controlers/patients.js";

const router = Router()
/*
router.get('/treatments', checkAuth, getProfesionalTreatmentsResume)
router.get('/earnings', checkAuth, getProfesionalEarnings)
router.get('/patients', checkAuth, getPatientsResume)
*/
export { router };