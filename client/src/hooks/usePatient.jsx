import useFetch from './useFetch'
import patientServices from '../services/patientSevices'

const usePatient = ({ idPatient } = {}) => {
    const getPatient = async () => {
        return await patientServices.getPatient({ idPatient })
    }

    const { isLoading, data } = useFetch(getPatient, [idPatient])

    return {
        isLoading,
        data,
    }
}

export default usePatient