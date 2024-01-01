import jwt from 'jsonwebtoken'

const tokenSign = async (user, secretKey, expirationTime) => {
    return jwt.sign(
        user,
        secretKey,
        {
            expiresIn: expirationTime,
        }
    )
}

const verifyToken = async (token, secretKey) => {
    try {
        return jwt.verify(token, secretKey)
    } catch(error) {
        console.log(error)
        return undefined
    }
}

const getTokenFromRequest = async (request) => {
    const secretKey = process.env.JWT_SECRET
    const token = request.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token, secretKey)
    return tokenData
}

const decodeSign = async (token) => {

}

export { tokenSign, verifyToken, decodeSign, getTokenFromRequest }