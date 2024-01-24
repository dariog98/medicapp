import { Op, Sequelize } from 'sequelize'
import { Appointment, Note, Patient, Treatment } from '../../models/postgres/index.js'
import { paginatedQuery } from '../../utils/paginatedQuery.js'
import { sequelize } from '../../config/postgres.js'
import { ClientError, ServerError } from '../../constants/errors.js'
import { helperImage } from '../../helpers/helperImage.js'
import { snakeToCamelObject } from '../../utils/snakeToCamel.js'

const getAllPatients = async ({ idProfesional, idTreatment, search, page, order }) => {
    const params = {}

    if (idProfesional) {
        const query = `
            select distinct id_patient
            from appointments
            where appointments.id_profesional = ${Number(idProfesional)}
            ${idTreatment ? `and appointments.id_treatment = ${Number(idTreatment)}`  : ''}
        `
        const [results] = await sequelize.query(query)
        const patients = results.map(row => row.id_patient)
        params.id = patients
    }

    return await paginatedQuery(Patient, 100, page, order, params, [],
    {
        [Op.or]: [
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), { [Op.like]: `%${search ?? ''}%` }),
            { dni: { [Op.like]: `%${search ?? ''}%` } }
        ]
    })
}

const getPatient = async ({ idPatient }) => {
    const patient = await Patient.findByPk(idPatient)
    if (!patient) throw new ClientError('Patient not found', 404)
    return patient
}

const createPatient = async({ names, surnames, dni, birthdate, phone, address }) => {    
    const patients = await Patient.findOne({ where: { dni } })
    if (patients) throw new ClientError('DNI is already in use', 409)

    try {
        await Patient.create({ names, surnames, dni, birthdate, phone, address })
    } catch(error) {
        throw new ServerError('Server error')
    }
}

const updatePatient = async ({ idPatient, names, surnames, dni, birthdate, phone, address }) => {
    const patient = await Patient.findOne({ where: { id: idPatient } })
    if (!patient) throw new ClientError('Patient is not found or does not exist', 404)

    try {
        await patient.update({ names, surnames, dni, birthdate, phone, address })
    } catch (error) {
        throw new ServerError('Server error')
    }
}

const deletePatient = async ({ idPatient }) => {
    const patient = await Patient.findOne({ where: { id: idPatient } })
    if (!patient) throw new ClientError('Patient is not found or does not exist', 404)

    try {
        await patient.destroy()
    } catch (error) {
        throw new ServerError('Server error')
    }
}

const getPatientTreatments = async ({ idPatient, status, page, order }) => {
    const appointments = await Appointment.findAll({ where: { id_patient: idPatient }, raw: true })
    const treatmentsOfPatient = appointments.map(appointment => appointment.id_treatment)
    return await paginatedQuery(Treatment, 100, page, order, {
        id: treatmentsOfPatient
    }, [ 'profesional' ])
}

const getPatientNotes = async ({ idPatient, search, page, order }) => {
    const { totalPages, total, data } = await paginatedQuery(Note, 10, page, order, {
        id_patient: idPatient
    })
    return { page, totalPages, total, data: data.map(note => snakeToCamelObject(note.get())) }
}

const createPatientNote = async ({ idPatient, content, createdBy }) => {
    return await Note.create({ id_patient: idPatient, content, created_by: createdBy })
}

const updatePatientNote = async ({ idPatient, idNote, content, modifiedBy }) => {
    const note = await Note.findOne({ where: { id_patient: idPatient, id: idNote } })
    if (!note) throw new ClientError('Note is not found or does not exist', 404)
    try {
        return await note.update({ content, modified_by: modifiedBy })
    } catch (error) {
        throw new ServerError('Server error')
    }
}

const deletePatientNote = async ({ idPatient, idNote }) => {
    const note = await Note.findOne({ where: { id_patient: idPatient, id: idNote } })
    if (!note) throw new ClientError('Note is not found or does not exist', 404)
    try {
        await note.destroy()
    } catch (error) {
        throw new ServerError('Server error')
    }
}

const getPatientPhotos = async ({ idPatient, search, page, order }) => {
    return await paginatedQuery(File, 100, page, order, { id_patient: idPatient, type: 'image' }, [], {
        name: { [Op.like]: `%${search ?? ''}%`}
    })    
}

const createPatientPhoto = async ({ idPatient, name, description, file, createdBy }) => {
    const type = 'image'
    await helperImage(file.path, file.filename)
    try {
        return await File.create({ name, filename: file.filename, description, type, idPatient, createdBy })
    } catch (error) {
        throw new ServerError('Server error')
    }
}

const getPatientFiles = async ({ idPatient, search, page, order }) => {
    return await paginatedQuery(File, 100, page, order, { id_patient: idPatient, type: 'other' }, [], {
        name: { [Op.like]: `%${search ?? ''}%`}
    })
}


const patientsService = {
    getAllPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientTreatments,
    getPatientNotes,
    createPatientNote,
    updatePatientNote,
    deletePatientNote,
    getPatientPhotos,
    createPatientPhoto,
    getPatientFiles
}

export default patientsService