import { Role } from '../../models/postgres/index.js'

const getAllRoles = async () => {    
    return await Role.findAll()
}

const rolesService = {
    getAllRoles
}

export default rolesService