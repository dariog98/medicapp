import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'
import useFetch from './useFetch'

const usePhoto = ({ photo }) => {
    const { userToken } = useUserContext()

    const getPhoto = async () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        }

        const URL = `${RouteAPI.Files}/${photo.filename}`
        const response = await fetch(URL, config)
        const data = await response.blob()
        return window.URL.createObjectURL(data)
    }

    const { isLoading, data } = useFetch(getPhoto, [photo])

    return { isLoading, data }
}

export default usePhoto