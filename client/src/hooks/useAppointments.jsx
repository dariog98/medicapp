import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import appointmentServices from '../services/appointmentServices'

const useAppointments = ({ idPatient, idProfesional, idTreatment, status, startTime, endTime } = {}) => {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ date_time: ORDER.Ascending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getAppointments = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return appointmentServices.getAllAppointments({ idPatient, idProfesional, idTreatment, startTime: startTime.toISOString(), endTime: endTime.toISOString(), status, page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getAppointments, [idPatient, idProfesional, idTreatment, status, startTime, endTime])

    return {
        isLoading,
        data,
        order,
        handleOrder
    }
}

export default useAppointments