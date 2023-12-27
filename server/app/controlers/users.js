import { compare, encrypt } from '../helpers/handleBcrypt.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import User from '../models/user.js'

const getUsers = async (request, response) => {
    try {
        const { search, page, order: stringOrder } = request.query
        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
        const results = await User.getPage(search ? search : '', page ? Number(page) - 1 : 0, order)

        const status = 200
        const message = ''
        handleResponse(response, status, message, results)
    } catch (error) {
        httpError(response, error)
        return
    }
}

const getUser = async (request, response) => {
    try {
        const id = request.params.id
        const user = await User.getByID(id)

        if (user) {
            const status = 200
            const message = ''
            handleResponse(response, status, message, user)
            return
        } else {
            const status = 404
            const message = 'No user found'
            handleResponse(response, status, message, null)
            return
        }
    } catch (error) {
        httpError(response, error)
    }
}

const getUserByUsername = async (request, response) => {
    try {
        const username = request.params.username
        const user = await User.getByUsername(username)

        if (user) {
            const status = 200
            const message = ''
            const data = {
                id: user.id,
                names: user.names,
                surnames: user.surnames,
                username: user.username,
                charge: user.charge,
                role: user.role,
                mail: user.mail,
                phone: user.phone,
            }
            handleResponse(response, status, message, data)
        } else {
            const status = 404
            const message = 'User not found'
            handleResponse(response, status, message)
        }

    } catch (error) {
        httpError(response, error)
    }
}

const getUserByMail = async (request, response) => {
    try {
        const { mail } = request.params
        const user = await User.getByMail(mail)

        if (user) {
            const status = 200
            const message = ''
            const data = {
                id: user.id,
                names: user.names,
                surnames: user.surnames,
                username: user.username,
                charge: user.charge,
                role: user.role,
                mail: user.mail,
                phone: user.phone,
            }
            handleResponse(response, status, message, data)
        } else {
            const status = 404
            const message = 'User not found'
            handleResponse(response, status, message)
        }

    } catch (error) {
        httpError(response, error)
    }
}

// const createUser = (request, response) => {
//     try {
//         const { username, password, names, surnames, mail, phone, idRole, idCharge } = request.body
//         User.create({
//             username, password, names, surnames, mail, phone, idRole, idCharge
//         })
//         .then(result => {
//             response.status(201)
//             response.send(result)
//         })
//         .catch(error => {
//             console.log(error)
//             response.status(500)
//             response.send({ errors: error.errors })
//         })
//     } catch (error) {
//         httpError(response, error)
//     }
// }

const createUser = async (request, response) => {
    try {
        const {
            username,
            password,
            names,
            surnames,
            mail,
            phone,
            idRole,
            idCharge,
        } = request.body

        const hashPassword = await encrypt(password)

        User.create({
            username,
            password: hashPassword,
            names,
            surnames,
            mail,
            phone,
            idRole,
            idCharge,
        })
        .then((result) => {
            const status = 201
            const message = 'User create successfully'
            handleResponse(response, status, message)
        })
        .catch((error) => {
            const errorNumber = Number(error?.original?.errno)
            const fields = error?.fields
            if (errorNumber === 1062) {
                const httpStatus = 409
                if (fields?.username) {
                    const status = 10062
                    const message = 'Username duplicate'
                    handleResponseCustomStatus(response, httpStatus, status, message)
                    return
                }
                if (fields?.mail) {
                    const status = 10063
                    const message = 'Mail duplicate'
                    handleResponseCustomStatus(response, httpStatus, status, message)
                    return
                }
            }
            const status = 500
            const message = 'An error occurred while trying to create the user'
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updateUser = async (request, response) => {
    try {
        const { id } = request.params
        const { username, names, surnames, mail, phone, idRole, idCharge } = request.body

        const user = await User.findOne({ where: { id } })

        if (!user) {
            const status = 404
            const message = 'User is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await user.update({ username, names, surnames, mail, phone, idRole, idCharge })

        const data = {
            id: user.id,
            names: user.names,
            surnames: user.surnames,
            username: user.username,
            charge: user.charge,
            role: user.role,
            mail: user.mail,
            phone: user.phone,
        }
    
        const status = 200
        const message = 'User  updated successfully'
        handleResponse(response, status, message, data)
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        const fields = error?.fields
        if (errorNumber === 1062) {
            const httpStatus = 409
            if (fields?.username) {
                const status = 10062
                const message = 'Username duplicate'
                handleResponseCustomStatus(response, httpStatus, status, message)
                return
            }
            if (fields?.mail) {
                const status = 10063
                const message = 'Mail duplicate'
                handleResponseCustomStatus(response, httpStatus, status, message)
                return
            }
        }
        const status = 500
        const message = `An error occurred while trying to update the user: ${error.message}`
        handleResponse(response, status, message)
    }
}

const deleteUser = (request, response) => {
    const { id } = request.params
    User.update({ isDeleted: 1 }, { where: { id } })
    .then((result) => {
        const status = 200
        const message = 'User deleted succesfully'
        handleResponse(response, status, message)
    })
    .catch((error) => {
        httpError(response, error)
    })
}

const activateUser = (request, response) => {
    const { id } = request.params
    User.update({ isDeleted: 0 }, { where: { id } })
    .then((result) => {
        const status = 200
        const message = 'User activate succesfully'
        handleResponse(response, status, message)
    })
    .catch((error) => {
        httpError(response, error)
    })
}

const updatePassword = async (request, response) => {
    try {
        const { id } = request.params
        const { oldPassword, newPassword } = request.body
        
        /*
        //comparar que sean distintas
        if (oldPassword === newPassword) {
            const status = 400
            const message = 'La nueva contraseña debe ser distinta a la anterior'
            handleResponse(response, status, message)
        }
        */
  
        //traer la contraseña actual de la db
        const user = await User.scope('withPassword').findOne({ where: { id: id } })

        if (!user) {
            const status = 404
            const message = 'User not found'
            handleResponse(response, status, message)
            return
        }

        const checkPass = await compare(oldPassword, user.password)

        if (!checkPass) {
            const status = 401
            const message = 'The password is incorrect'
            handleResponse(response, status, message)
            return
        }

        const newPass = await encrypt(newPassword)
        const result = await User.update( { password: newPass }, { where: { id: id } })
        //   console.log({ result: result })
        //informar la contraseña ha sido actualizada correctamente
        //el front deberia cerrar sesión para que el usuario inicie sesión con la contraseña nueva
        const status = 200
        const message = 'Password updated successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getUsers,
    getUser,
    getUserByUsername,
    getUserByMail,
    createUser,
    updateUser,
    updatePassword,
    deleteUser,
    activateUser,
}
