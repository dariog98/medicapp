import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import turnServices from '../services/turnServices'

const useTurns = ({ idPatient, idProfesional, idTreatment, status, startTime, endTime } = {}) => {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ dateTime: ORDER.Ascending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getTurns = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return turnServices.getAllTurns({ idPatient, idProfesional, idTreatment, startTime, endTime, status, page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getTurns, [idPatient, idProfesional, idTreatment, status, startTime, endTime])

    return {
        isLoading,
        data,
        order,
        handleOrder
    }
}

export default useTurns