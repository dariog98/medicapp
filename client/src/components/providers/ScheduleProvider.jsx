import { createContext, useContext } from 'react'
import { useScheduleEventModal } from '../../hooks'

const scheduleContext = createContext()

const ScheduleProvider = ({ idProfesional, refreshEvents, children }) => {
    const modal = useScheduleEventModal({ idProfesional, refreshEvents })

    return (
        <scheduleContext.Provider value={{ ...modal, idProfesional }}>
            {children}
        </scheduleContext.Provider>
    )
}

const useScheduleContext = () => {
    return useContext(scheduleContext)
}

export { ScheduleProvider, useScheduleContext }