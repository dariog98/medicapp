import { catchedAsync } from '../helpers/catchedAsync.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { PatientsService } from '../services/postgres/index.js'

const getAllPatients = async (request, response) => {
    const { search, idProfesional, idTreatment, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await PatientsService.getAllPatients({ idProfesional, idTreatment, search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages})
}

const getPatient = async (request, response) => {
    const { id: idPatient } = request.params
    const patient = await PatientsService.getPatient({ idPatient })
    handleResponse({ response, statusCode: 200, message: 'Patient found', data: patient })
}

const createPatient = async(request, response) => {
    const { names, surnames, dni, birthdate, phone, address } = request.body
    await PatientsService.createPatient({ names, surnames, dni, birthdate, phone, address })
    handleResponse({ response, statusCode: 201, message: 'Patient create successfully' })
}

const updatePatient = async (request, response) => {
    const { id: idPatient } = request.params
    const { names, surnames, dni, birthdate, phone, address } = request.body
    await PatientsService.updatePatient({ idPatient, names, surnames, dni, birthdate, phone, address })
    handleResponse({ response, statusCode: 200, message: 'Patient updated successfully' })
}

const deletePatient = async (request, response) => {
    const { id: idPatient } = request.params
    await PatientsService.deletePatient({ idPatient })
    handleResponse({ response, statusCode: 200, message: 'Patient deleted successfully' })
}

const getPatientFiles = async (request, response) => {
    const { id: idPatient } = request.params
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await PatientsService.getPatientFiles({ idPatient, search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getPatientPhotos = async (request, response) => {
    const { id: idPatient } = request.params
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await PatientsService.getPatientPhotos({ idPatient, search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const createPatientPhoto = async (request, response) => {
    const { params: { id: idPatient }, body: { name, description }, file } = request
    const { idUser: createdBy } = await getTokenFromRequest(request)
    await PatientsService.createPatientPhoto({ idPatient, name, description, file, createdBy })
    handleResponse({response, statusCode: 201, message: 'File create successfully' })
}

const getPatientTreatments = async (request, response) => {
    const { id: idPatient } = request.params
    const { status: status, order: stringOrder, page } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await PatientsService.getPatientTreatments({ idPatient, status, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getPatientNotes = async (request, response) => {
    const { id: idPatient } = request.params
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'DESC']
    const { totalPages, data, total } = await PatientsService.getPatientNotes({ idPatient, search, page, order })
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const createPatientNote = async (request, response) => {
    const { id: idPatient } = request.params
    const { content } = request.body
    const { idUser: createdBy } = await getTokenFromRequest(request)
    await PatientsService.createPatientNote({ idPatient, content, createdBy })
    handleResponse({ response, statusCode: 201, message: 'Note create successfully' })
}

const updatePatientNote = async (request, response) => {
    const { id: idPatient, note: idNote } = request.params
    const { content } = request.body
    const { idUser: modifiedBy } = await getTokenFromRequest(request)
    await PatientsService.updatePatientNote({ idPatient, idNote, content, modifiedBy })
    handleResponse({ response, statusCode: 200, message: 'Note updated successfully' })
}

const deletePatientNote = async (request, response) => {
    const { id: idPatient, note: idNote } = request.params
    await PatientsService.deletePatientNote({ idPatient, idNote })
    handleResponse({ response, statusCode: 200, message: 'Note deleted successfully' })
}

const patientController = {
    getAllPatients: catchedAsync(getAllPatients),
    getPatient: catchedAsync(getPatient),
    createPatient: catchedAsync(createPatient),
    updatePatient: catchedAsync(updatePatient),
    deletePatient: catchedAsync(deletePatient),
    getPatientFiles: catchedAsync(getPatientFiles),
    getPhotos: catchedAsync(getPatientPhotos),
    createPhoto: catchedAsync(createPatientPhoto),
    getPatientTreatments: catchedAsync(getPatientTreatments),
    getPatientNotes: catchedAsync(getPatientNotes),
    createPatientNote: catchedAsync(createPatientNote),
    updatePatientNote: catchedAsync(updatePatientNote),
    deletePatientNote: catchedAsync(deletePatientNote),
}

export default patientController