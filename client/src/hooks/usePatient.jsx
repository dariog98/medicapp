import useFetch from './useFetch'
import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'

const usePatient = ({ idPatient } = {}) => {
    const { userToken } = useUserContext()

    const getPatient = async () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        }

        const URL = `${RouteAPI.Patients}/${idPatient}`
        const response = await fetch(URL, config)
        return await response.json()
    }

    const { isLoading, data } = useFetch(getPatient, [idPatient])

    return {
        isLoading,
        data,
    }
}

export default usePatient