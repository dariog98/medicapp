import { Op, Sequelize } from 'sequelize'
import { ClientError } from '../constants/errors.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { File, Note, Patient, Treatment, Turn } from '../models/index.js'
import { paginatedQuery } from '../utils/paginatedQuery.js'

const getAllPatients = async (request, response) => {
    const { search, idProfesional, idTreatment, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    
    const { totalPages, data, total } = await paginatedQuery(Patient, 100, page, order, {
        dni: { [Op.like]: `%${search ?? ''}%` }
        /*
        $or: [
            { dni: { $like: `%${search ?? ''}%` } },
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), { [Op.like]: `%${search ?? ''}%` })
        ]*/
    })

    handleResponse({ response, statusCode: 200, data, total, totalPages})
}

const getPatient = async (request, response) => {
    const { id: idPatient } = request.params
    const patient = await Patient.findByPk(idPatient)

    if (!patient) throw new ClientError('Patient not found', 404)

    handleResponse({ response, statusCode: 200, message: 'Patient found', data: patient })
}

const createPatient = async(request, response) => {
    const { names, surnames, dni, birthdate, phone, address } = request.body
    
    const patients = await Patient.findOne({ where: { dni } })
    if (patients) throw new ClientError('DNI is already in use', 409)
    
    await Patient.create({ names, surnames, dni, birthdate, phone, address })
    
    handleResponse({ response, statusCode: 201, message: 'Patient create successfully' })
}

const updatePatient = async (request, response) => {
    const { id } = request.params
    const { names, surnames, dni, birthdate, phone, address } = request.body

    const patient = await Patient.findOne({ where: { id } })
    if (!patient) throw new ClientError('Patient is not found or does not exist', 404)

    await patient.update({ names, surnames, dni, birthdate, phone, address })

    handleResponse({ response, statusCode: 200, message: 'Patient updated successfully' })
}

const deletePatient = async (request, response) => {
    const { id } = request.params
    const patient = await Patient.findOne({ where: { id } })

    if (!patient) throw new ClientError('Patient is not found or does not exist', 404)

    await patient.destroy()

    handleResponse({ response, statusCode: 200, message: 'Patient deleted successfully' })
}

const getPatientFiles = async (request, response) => {
    const { id: idPatient } = request.params
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await paginatedQuery(File, 100, page, order, { idPatient, type: 'other' })

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getPatientPhotos = async (request, response) => {
    const { id: idPatient } = request.params
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    const { totalPages, data, total } = await paginatedQuery(File, 100, page, order, { idPatient, type: 'image' })

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getPatientTurns = async (request, response) => {
    const { id: idPatient } = request.params
    const { idProfesional, idTreatment, status, rows, page, startTime, endTime, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
    
    const { totalPages, data, total } = await paginatedQuery(Turn, rows, page, order, {
        idPatient,
        idProfesional,
        idTreatment,
        startTime,
        endTime,
        status
    }, [ 'treatment', 'profesional' ])

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getPatientTreatments = async (request, response) => {
    const { id: idPatient } = request.params
    const { status: status, order: stringOrder, page } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

    const turns = await Turn.findAll({ where: { idPatient }, raw: true })
    const treatmentsOfPatient = turns.map(turn => turn.idTreatment)

    const { totalPages, data, total } = await paginatedQuery(Treatment, 100, page, order, {
        id: treatmentsOfPatient
    }, [ 'profesional' ])

    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const getPatientNotes = async (request, response) => {
    const { id: idPatient } = request.params
    const { search, page, order: stringOrder } = request.query
    const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'DESC']
    const { totalPages, data, total } = await paginatedQuery(Note, 10, page, order, {
        idPatient
    })
    
    handleResponse({ response, statusCode: 200, data, total, totalPages })
}

const createPatientNote = async (request, response) => {
    const { id: idPatient } = request.params
    const { content } = request.body
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.id
    
    const note = Note.create({ idPatient, content, createdBy })
    handleResponse(response, 201, 'Note create successfully', note)
}

const updatePatientNote = async (request, response) => {
    const { id: idPatient, note: idNote } = request.params
    const { content } = request.body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.id
    
    const note = await Note.findOne({ where: { idPatient, id: idNote } })
    if (!note) throw new ClientError('Note is not found or does not exist', 404)

    await note.update({ content, modifiedBy })

    handleResponse(response, 200, 'Note updated successfully', note)
}

const deletePatientNote = async (request, response) => {
    const { id: idPatient, note: idNote } = request.params

    const note = await Note.findOne({ where: { idPatient, id: idNote } })
    if (!note) throw new ClientError('Note is not found or does not exist', 404)

    await note.destroy()
    handleResponse(response, 200, 'Note deleted successfully')
}

const patientController = {
    getAllPatients: catchedAsync(getAllPatients),
    getPatient: catchedAsync(getPatient),
    createPatient: catchedAsync(createPatient),
    updatePatient: catchedAsync(updatePatient),
    deletePatient: catchedAsync(deletePatient),
    getPatientFiles: catchedAsync(getPatientFiles),
    getPatientPhotos: catchedAsync(getPatientPhotos),
    getPatientTurns: catchedAsync(getPatientTurns),
    getPatientTreatments: catchedAsync(getPatientTreatments),
    getPatientNotes: catchedAsync(getPatientNotes),
    createPatientNote: catchedAsync(createPatientNote),
    updatePatientNote: catchedAsync(updatePatientNote),
    deletePatientNote: catchedAsync(deletePatientNote),
}

export default patientController