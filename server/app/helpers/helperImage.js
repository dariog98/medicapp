import sharp from 'sharp'
import fs from 'fs'
import { getStoragePath } from '../utils/getStoragePath.js'

const helperImage = async (filepath, filename, size = 300) => {
    const pathStorage = getStoragePath()
    const pathThumbnail = `${pathStorage}/thumbnail`
    
    if (!fs.existsSync(pathStorage)) {
        fs.mkdirSync(pathStorage)
    }

    if (!fs.existsSync(pathThumbnail)) {
        fs.mkdirSync(pathThumbnail)
    }

    return await sharp(filepath).resize(size).toFile(`${pathThumbnail}/${filename}`)
}

export { helperImage }