import useFetch from './useFetch'
import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'

const useProfesional = ({ idProfesional } = {}) => {
    const { userToken } = useUserContext()

    const getProfesional = async () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        }

        const URL = `${RouteAPI.Profesionals}/${idProfesional}`
        const response = await fetch(URL, config)
        return await response.json()
    }

    const { isLoading, data } = useFetch(getProfesional, [idProfesional])

    return {
        isLoading,
        data,
    }
}

export default useProfesional