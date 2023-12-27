import { RouteAPI } from '../constants/routesAPI'

const login = async (data) => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = RouteAPI.Login
    const response = await fetch(URL, config)
    return await response.json()
}

const userServices = { login }

export default userServices