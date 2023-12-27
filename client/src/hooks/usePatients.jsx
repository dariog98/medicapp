import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import patientServices from '../services/patientServices'

const usePatients = ({ idProfesional, idTreatment, search }) => {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Descending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getPatients = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return await patientServices.getAllPatients({ idProfesional, idTreatment, search, page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getPatients, [search, page, order, idProfesional, idTreatment])

    return {
        isLoading,
        data, 
        page,
        order,
        handlePage: setPage,
        handleOrder,
    }
}

export default usePatients