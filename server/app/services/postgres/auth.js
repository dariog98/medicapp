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

const authService = {
    loginUser
}

export default authService