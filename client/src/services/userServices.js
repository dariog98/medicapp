import { CONTENT_TYPES, METHODS, newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const login = async (data) => {
    const url = RouteAPI.Login
    const request = newRequest({ url, method: METHODS.Post, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const changePassword = async (data) => {
    const url = RouteAPI.Password
    const request = newRequest({ url, method: METHODS.Patch, contentType: CONTENT_TYPES.JSON, body: data, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const userServices = {
    login,
    changePassword,
}

export default userServices