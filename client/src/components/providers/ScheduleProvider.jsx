import { createContext, useContext } from 'react'
import { useScheduleEventModal } from '../../hooks'

const scheduleContext = createContext()

const ScheduleProvider = ({ idProfesional, children }) => {
    const modal = useScheduleEventModal({ idProfesional })

    return (
        <scheduleContext.Provider value={modal}>
            {children}
        </scheduleContext.Provider>
    )
}

const useScheduleContext = () => {
    return useContext(scheduleContext)
}

export { ScheduleProvider, useScheduleContext }