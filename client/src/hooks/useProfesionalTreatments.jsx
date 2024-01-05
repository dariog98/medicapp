import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import profesionalServices from '../services/profesionalServices'

const useProfesionalTreatments = ({ search, idProfesional } = {}) => {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Descending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getProfesionals = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return await profesionalServices.getTreatments({ idProfesional, search, page, order: tableOrder })
    }

    const { isLoading, data, fechData: refreshTreatments } = useFetch(getProfesionals, [search, page, order])

    return {
        isLoading,
        data, 
        page,
        order,
        handlePage: setPage,
        handleOrder,
        refreshTreatments
    }
}

export default useProfesionalTreatments