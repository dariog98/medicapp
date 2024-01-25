import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const getAllPatients = async ({ idProfesional, idTreatment, search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        idProfesional: idProfesional ?? '',
        idTreatment: idTreatment ?? '',
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Patients}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getPatient = async ({ idPatient }) => {
    const url = `${RouteAPI.Patients}/${idPatient}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createPatient = async ({ data }) => {
    const url = RouteAPI.Patients
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updatePatient = async ({ idPatient, data }) => {
    const url = `${RouteAPI.Patients}/${idPatient}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deletePatient = async ({ idPatient }) => {
    const url = `${RouteAPI.Patients}/${idPatient}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getAllNotes = async({ idPatient, search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Patients}/${idPatient}/notes?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createNote = async ({ idPatient, data }) => {
    const url = `${RouteAPI.Patients}/${idPatient}/notes`
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    console.log({request})
    const response = await fetch(request)
    return await response.json()
}

const updateNote = async ({ idPatient, idNote, data }) => {
    const url = `${RouteAPI.Patients}/${idPatient}/notes/${idNote}`
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deleteNote = async ({ idPatient, idNote }) => {
    const url = `${RouteAPI.Patients}/${idPatient}/notes/${idNote}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getAllPhotos = async({ idPatient, search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Patients}/${idPatient}/photos?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const createPhoto = async ({ idPatient, data }) => {
    const url = `${RouteAPI.Patients}/${idPatient}/photos`
    const request = newRequest({ url, method: METHODS.Post, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const updatePhoto = async ({ idPatient, idPhoto, data }) => {
    const url = `${RouteAPI.Patients}/${idPatient}/photos/${idPhoto}`
    const request = newRequest({ url, method: METHODS.Patch, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const deletePhoto = async ({ idPatient, idPhoto }) => {
    const url = `${RouteAPI.Patients}/${idPatient}/photos/${idPhoto}`
    const request = newRequest({ url, method: METHODS.Delete, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getAllPatientFiles = async({ idPatient, search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Patients}/${idPatient}/files?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const getAllPatientTreatments = async({ idPatient, search, page, order }) => {
    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Patients}/${idPatient}/treatments?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const patientServices = {
    getAllPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getAllPatientFiles,
    getAllPhotos,
    createPhoto,
    updatePhoto,
    deletePhoto,
    getAllPatientTreatments
}

export default patientServices