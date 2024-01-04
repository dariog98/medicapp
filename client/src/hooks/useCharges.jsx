import { useState } from 'react'
import { ORDER } from '../constants/order'
import useFetch from './useFetch'
import chargeServices from '../services/chargeServices'

const useCharges = ({ search } = {}) => {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Ascending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getCharges = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])
        return chargeServices.getAllCharges({ page, order: tableOrder })
    }

    const { isLoading, data } = useFetch(getCharges, [search, page, order])

    return {
        isLoading,
        data,
        order,
        handleOrder
    }
}

export default useCharges