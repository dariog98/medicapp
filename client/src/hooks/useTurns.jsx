import { useState } from 'react'
import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'

const useTurns = ({ idPatient, idProfesional, idTreatment, status, startTime, endTime } = {}) => {
    const { userToken } = useUserContext()
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ dateTime: ORDER.Ascending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getTurns = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])

        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        }

        const params = new URLSearchParams({
            page: page ?? 1,
            idPatient: idPatient ?? '',
            idProfesional: idProfesional ?? '',
            idTreatment: idTreatment ?? '',
            order: JSON.stringify(tableOrder ?? []),
        })

        const URL = `${RouteAPI.Turns}?${params.toString()}`
        const response = await fetch(URL, config)
        return await response.json()
    }

    const { isLoading, data } = useFetch(getTurns, [idPatient, idProfesional, status, startTime, endTime])

    return {
        isLoading,
        data,
        order,
        handleOrder
    }
}

export default useTurns