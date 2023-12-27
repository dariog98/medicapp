import { useState } from 'react'
import useFetch from './useFetch'
import { ORDER } from '../constants/order'
import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'

const useProfesionals = ({ search } = {}) => {
    const { userToken } = useUserContext()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Descending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getProfesionals = async () => {
        const tableOrder = Object.keys(order).map(key => [key, order[key]])

        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        }
    
        const params = new URLSearchParams({
            search: search ?? '',
            page: page ?? 1,
            order: JSON.stringify(tableOrder ?? []),
        })
    
        const URL = `${RouteAPI.Profesionals}?${params.toString()}`
        const response = await fetch(URL, config)
        return await response.json()
    }

    const { isLoading, data } = useFetch(getProfesionals, [search, page, order])

    return {
        isLoading,
        data, 
        totalPages,
        page,
        order,
        handlePage: setPage,
        handleOrder,
    }
}

export default useProfesionals