import { ValidationErrorItem } from 'sequelize'
import { ClientError, ServerError } from '../constants/errors.js'
import { catchedAsync } from '../helpers/catchedAsync.js'
import { getTokenFromRequest, tokenSign } from '../helpers/generateToken.js'
import { encrypt, compare } from '../helpers/handleBcrypt.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import { sendMail } from '../helpers/sendMail.js'
import { User } from '../models/index.js'

const tokenSecretKey = process.env.JWT_SECRET
const refreshTokenSecretKey = process.env.JWT_RT_SECRET

const login = async (request, response) => {
    const { user: usernameOrMail, password } = request.body
    
    const user = await User.getByUsernameOrMail(usernameOrMail)
    
    if (!user) throw new ClientError('User not found', 404)

    const { id: idUser, username, names, surnames, mail, phone, charge, role } = user

    const userResume = { idUser, username, charge, role }

    const checkPassword = await compare(password, user.password)
    
    if (!checkPassword) throw new ClientError('Invalid password', 409)
    
    const accessToken = await tokenSign(userResume, tokenSecretKey, '24h')
    const refreshToken = await tokenSign(userResume, refreshTokenSecretKey, '30d')

    const data = {
        idUser,
        surnames,
        names,
        username,
        mail,
        phone,
        charge,
        role,
        accessToken,
        refreshToken
    }

    handleResponse({ response, statusCode: 200, message: 'Login user sucessfully', data })
}

const update = async (request, response) => {
    const accessToken = await getTokenFromRequest(request)
    const { idUser } = accessToken
    const { username, names, surnames, mail, phone, idCharge } = request.body

    let user = await User.getById(idUser)

    if (!user) throw new ClientError('User not found', 404)

    // Update user
    await user.update({ username, names, surnames, mail, phone, idCharge })

    user = await User.getById(idUser)

    const userResume = { idUser, username, charge: user.charge, role: user.role }

    const newAccessToken = await tokenSign(userResume, tokenSecretKey, '24h')
    const newRefreshToken = await tokenSign(userResume, refreshTokenSecretKey, '30d')

    const data = {
        idUser,
        surnames,
        names,
        username,
        mail,
        phone,
        charge: user.charge,
        role: user.role,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }

    handleResponse({ response, statusCode: 200, message: 'User updated successfully', data })
}

const register = async (request, response) => {
    const { names, surnames, username, password, mail, idCharge, idRole } = request.body
    const passwordHash = await encrypt(password)

    try {
        await User.create({
            names: names,
            surnames: surnames,
            username: username, 
            password: passwordHash,
            mail: mail,
            idCharge: idCharge,
            idRole: idRole
        })
        handleResponse({ response, statusCode: 201, message: 'User create successfully' })
    } catch(error) {
        const err = error.errors.pop()
        const errorList = {
            'username': new ClientError('Validation error: Username is already in use', 409),
            'mail': new ClientError('Validation error: Mail is already in use', 409)
        }
        if (err instanceof ValidationErrorItem) {
            throw errorList[err.path]
        }
        throw new ServerError('Server error')
    }
}

const resetPassword = async(request, response) => {
    const { mail } = request.body
    const user = await User.getByMail(mail)

    if (!user || user.isDeleted) throw new ClientError('User not found', 404)

    // Update password
    const password = (Date.now()).toString(32)
    const passwordHash = await encrypt(password)

    console.log({
        password, passwordHash,
    })

    await user.update({ password: passwordHash })
    
    // Send mail
    await sendMail(user.mail, password)

    handleResponse({response, statusCode: 200, message: 'User password reset. The user will receive their new password by email' })
}

const updatePassword = async (request, response) => {
    const { currentPassword, password } = request.body
    const accessToken = await getTokenFromRequest(request)
    const { idUser } = accessToken
    
    const user = await User.scope('withPassword').findOne({ where: { id: idUser } })
    if (!user) throw new ClientError('User not found', 404)

    const checkPassword = await compare(currentPassword, user.password)
    if (!checkPassword) throw new ClientError('The password is incorrect', 401)

    const passwordHash = await encrypt(password)
    await user.update({ password: passwordHash })
    handleResponse({ response, statusCode: 200, message: 'Password updated successfully' })
}

const authenticationController = {
    login: catchedAsync(login),
    register: catchedAsync(register),
    update: catchedAsync(update),
    updatePassword: catchedAsync(updatePassword),
    resetPassword: catchedAsync(resetPassword)
}

export default authenticationController 