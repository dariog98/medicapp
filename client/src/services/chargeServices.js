import { newRequest } from '../constants/request'
import { RouteAPI } from '../constants/routesAPI'

const getAllCharges = async ({ page, order }) => {
    const params = new URLSearchParams({
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Charges}?${params.toString()}`
    const request = newRequest({ url, userToken: true })
    const response = await fetch(request)
    return await response.json()
}

const chargeServices = {
    getAllCharges
}

export default chargeServices