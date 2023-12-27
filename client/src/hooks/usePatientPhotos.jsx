import useFetch from './useFetch'
import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'
import { useState } from 'react'
import { ORDER } from '../constants/order'

const usePatientPhotos = ({ idPatient } = {}) => {
    const { userToken } = useUserContext()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Descending })

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getPatientPhotos = async () => {
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

        const URL = `${RouteAPI.Patients}/${idPatient}/photos?${params.toString()}`
        const response = await fetch(URL, config)
        return await response.json()
    }

    const { isLoading, data } = useFetch(getPatientPhotos, [idPatient, search, page, order])

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

export default usePatientPhotos