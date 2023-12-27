import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import patientServices from '../services/patientServices'

const usePatientTreatments = ({ idPatient } = {}) => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Descending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getPatientTreatments = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return await patientServices.getAllPatientTreatments({ idPatient, search, page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getPatientTreatments, [idPatient, search, page, order])

    return {
        isLoading,
        data,
        order,
        handleOrder,
        page,
        handlePage: setPage,
        handleSearch: setSearch
    }
}

export default usePatientTreatments