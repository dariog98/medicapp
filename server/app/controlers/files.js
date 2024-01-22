import fs from 'fs'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import { File } from '../models/postgres/index.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { helperImage } from '../helpers/helperImage.js'
import { getStoragePath } from '../utils/getStoragePath.js'

const getFile = async (request, response) => {
    try {
        const { filename } = request.params
        const file = await File.findOne({ where: { filename } })
        const pathStorage = getStoragePath()
        const pathFile = `${pathStorage}/${file.filename}`

        response.status(200).sendFile(pathFile)
    } catch (error) {
        httpError(response, error)
    }
}

const getThumbnail = async (request, response) => {
    try {
        const filename = request.params.filename
        const file = await File.findOne({ where: { filename } })
        const pathStorage = getStoragePath()
        const pathFile = `${pathStorage}/thumbnail/${file.filename}`

        response.status(200)
        response.sendFile(pathFile)
    } catch (error) {
        httpError(response, error)
    }
}

const createFile = async (request, response) => {
    try {
        const accessToken = await getTokenFromRequest(request)
        const createdBy = accessToken.id
        const { body, file } = request
        const { name, description, idPatient } = body
        const filename = file.filename

        const type = file.mimetype.split('/')[0] === 'image' ? 'image' : undefined

        // Save thumbnail (miniatura) para imagenes
        if (type === 'image') {
            await helperImage(file.path, file.filename)
        }

        const existingFile = await File.findOne({ where: { name, idPatient } })

        if (existingFile) {
            const status = 409
            const message = 'File already exists'
            handleResponse(response, status, message, existingFile)
        } else {
            File.create({
                name,
                filename,
                description,
                type,
                createdBy,
                idPatient
            })
            .then(result => {
                const status = 201
                const message = 'File create successfully'
                handleResponse(response, status, message, result)
            })
            .catch(error => {
                console.log(error)
                const status = 500
                const message = `An error occurred while trying to create the file: ${error.errors[0].message}`
                handleResponse(response, status, message)
            })
        }
    } catch (error) {
        httpError(response, error)
    }
}

const updateFile = async (request, response) => {
    try {
        const { id } = request.params
        const { body, file } = request
        const filename = file?.filename
        const { name, description } = body
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        // Save thumbnail (miniatura) para imagenes
        const type = file?.mimetype.split('/')[0] === 'image' ? 'image' : undefined
        if (type === 'image') {
            helperImage(file.path, file.filename)
        }
        
        const filedb = await File.findOne({ where: { id } })

        if (!filedb) {
            const status = 404
            const message = 'File is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await filedb.update({ name, filename, description, modifiedBy })

        const status = 200
        const message = 'File updated successfully'
        handleResponse(response, status, message, filedb)
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1062) {
            const httpStatus = 409
            const status = 1062
            const message = 'Name duplicate'
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        httpError(response, error)
    }
}

const deleteFile = async (request, response) => {
    try {
        const { id } = request.params

        const file = await File.findOne({ where: { id } })

        if (!file) {
            const status = 200
            const message = 'File is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        const filename = file?.filename
        const pathStorage = getStoragePath()
        const pathFile = `${pathStorage}/${filename}`
        const pathThumbnail = `${pathStorage}/thumbnail/${filename}`

        await file.destroy()

        if (fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile)
        }

        if (fs.existsSync(pathThumbnail)) {
            fs.unlinkSync(pathThumbnail)
        }

        const status = 200
        const message = 'File deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
}

const deleteAllFiles = async (request, response) => {
    try {
        File.destroy({
            where: {},
            truncate: true
        })
        .then(() => {
            const { pathname } = new URL('..', import.meta.url)
            const storagepath = `${pathname}storage`

            if (fs.existsSync(storagepath)) {
                fs.rmSync(storagepath, { recursive: true, force: true })
            }

            const status = 200
            const message = 'All files deleted successfully'
            handleResponse(response, status, message)
        })
        .catch(error => {
            console.log(error)
            const status = 500
            const message = 'An error occurred while trying to delete all the files'
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getFile,
    getThumbnail,
    createFile,
    updateFile,
    deleteFile,
    deleteAllFiles
}