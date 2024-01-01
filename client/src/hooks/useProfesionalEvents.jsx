import { useSettingsContext } from '../components/providers/SettingsProvider'
import { getStringDateInTimeZone } from '../constants/dateToString'
import { UTC } from '../constants/time'
import profesionalServices from '../services/profesionalServices'
import useFetch from './useFetch'

const useProfesionalEvents = ({ idProfesional, date }) => {
    const { timeZone } = useSettingsContext()

    const getProfesionalEvents = async () => {
        const day = getStringDateInTimeZone(date, UTC)
        const startTime = new Date(`${day}T00:00:00${timeZone.numeric}`)
        const response = await profesionalServices.getEvents({ idProfesional, startTime })

        const groupEvents = {}

        response.data.forEach(event => {
            if (groupEvents[event.type] === undefined) {
                groupEvents[event.type] = []
            }
            groupEvents[event.type].push(event)
        })

        return { ...response, data: groupEvents }
    }

    const { isLoading, data, fechData: refreshEvents } = useFetch(getProfesionalEvents, [idProfesional, date])

    return {
        isLoading,
        data,
        refreshEvents
    }
}

export default useProfesionalEvents