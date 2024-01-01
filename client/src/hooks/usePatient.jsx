import useFetch from './useFetch'
import patientServices from '../services/patientServices'

const usePatient = ({ idPatient } = {}) => {
    const getPatient = async () => {
        return await patientServices.getPatient({ idPatient })
    }

    const { isLoading, data, fechData: refreshData } = useFetch(getPatient, [idPatient])

    return {
        isLoading,
        data,
        refreshData
    }
}

export default usePatient