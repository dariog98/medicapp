import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const isWindows = process.platform === 'win32'

const getStoragePath = () => {
    if (isWindows) {
        const __filename = fileURLToPath(new URL('..', import.meta.url))
        const __dirname = dirname(__filename)
        const pathStorage = join(__dirname, 'storage')
        return pathStorage
    } else {
        const { pathname } = new URL('..', import.meta.url)
        const pathStorage = `${pathname}storage`
        return pathStorage
    }
}

export { getStoragePath }