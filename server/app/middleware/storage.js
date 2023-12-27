import { getStoragePath } from '../utils/getStoragePath.js'
import multer from 'multer'
import fs from 'fs'

const destinationFunction = (request, file, callback) => {
    const pathStorage = getStoragePath()

    if (!fs.existsSync(pathStorage)) {
        fs.mkdirSync(pathStorage)
    }
    
    callback(null, pathStorage)
}

const filenameFunction = (request, file, callback) => {
    //const filename = file.originalname
    //const extension = file.mimetype.split('/').pop()
    const extension = file.originalname.split('.').pop()
    const filename = `file-${Date.now()}.${extension}`
    callback(null, filename)
}

const storage = multer.diskStorage({
    destination: destinationFunction,
    filename: filenameFunction
})

const uploadMiddleware = multer({ storage })

const upload = (request, response, next) => {
    const file = uploadMiddleware.single('file')
    file(request, response, (error) => {
        if (error) {
            console.log(error)
        } else {
            next()
        }
    })
}

export { uploadMiddleware, upload }