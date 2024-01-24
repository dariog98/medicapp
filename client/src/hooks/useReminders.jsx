import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import reminderServices from '../services/reminderServices'

const useReminders = ({ idPatient, idProfesional, startTime, endTime } = {}) => {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ date_time: ORDER.Ascending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getReminders = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return reminderServices.getAllReminders({ idPatient, idProfesional, startTime, endTime, page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getReminders, [idPatient, idProfesional, startTime, endTime])

    return {
        isLoading,
        data,
        order,
        handleOrder
    }
}

export default useReminders