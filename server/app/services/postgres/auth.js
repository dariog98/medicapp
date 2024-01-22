import { ClientError } from '../../constants/errors.js'
import { tokenSign } from '../../helpers/generateToken.js'
import { compare } from '../../helpers/handleBcrypt.js'
import { User } from '../../models/postgres/index.js'

const tokenSecretKey = process.env.JWT_SECRET
const refreshTokenSecretKey = process.env.JWT_RT_SECRET

const loginUser = async ({ usernameOrMail, password }) => {    
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

    return data
}

const updatePassword = async ({ idUser, currentPassword, newPassword }) => {
    const user = await User.scope('withPassword').findOne({ where: { id: idUser } })
    if (!user) throw new ClientError('User not found', 404)

    const checkPassword = await compare(currentPassword, user.password)
    if (!checkPassword) throw new ClientError('The password is incorrect', 401)

    const passwordHash = await encrypt(newPassword)
    await user.update({ password: passwordHash })
}

const authService = {
    loginUser,
    updateUserPassword
}

export default authService