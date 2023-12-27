import { verifyToken } from "../helpers/generateToken.js"

const checkRolesAuth = (roles) => async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = null

        if([].concat(roles),includes(userData.role)) {
            next()
        } else {
            response.status(409)
            response.send({ 
                status: response.statusCode,
                message: 'You do not have permissions to perform this operation'
            })   
        }
    } catch (error) {
        console.log(error)
        response.status(409)
        response.send({
            status: response.statusCode,
            message: 'You do not have permissions to perform this operation'
        })
    }
}

export { checkAuth }