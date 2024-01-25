import { useState } from 'react'
import { faCalendarDays, faClock, faHouse } from '@fortawesome/free-solid-svg-icons'
import { AppointmentsList, Container, ReminderList, Title } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useAppointments, useReminders } from '../hooks'
import { getStringDateInTimeZone, newDateInTimeZone } from '../constants/dateToString'
import { useUserContext } from '../components/providers/UserProvider'

const Home = () => {
    const { language, timeZone } = useSettingsContext()
    const { user, isAdmin } = useUserContext()
    const [year, month, date] = getStringDateInTimeZone(new Date(), timeZone).split('-')
    const [startTime] = useState(newDateInTimeZone(timeZone, year, month, date))
    const [endTime] = useState(newDateInTimeZone(timeZone, year, month, date, 23, 59))
    const idProfesional = !isAdmin ? user.idUser : undefined
    const { isLoading: isLoadingTurns, data: dataTurns } = useAppointments({ startTime: startTime.toISOString(), endTime: endTime.toISOString(), idProfesional })
    const { isLoading: isLoadingReminders, data: dataReminders } = useReminders({ startTime: startTime.toISOString(), endTime: endTime.toISOString(), idProfesional })

    return (
        <Container>
            <div className='d-flex flex-column gap-3'>
                <Title icon={faHouse} text={language.Home}/>

                <div className='d-grid gap-3' style={{ gridTemplateColumns: '1fr 1fr' }}>
                    
                    <div className='d-flex flex-column gap-3'>
                        <Title icon={faCalendarDays} text={language.headings.TodaysAppointments}/>

                        <div className='overflow-auto'  style={{ maxHeight: 'calc(100vh - 160px)' }}>
                            <AppointmentsList isLoading={isLoadingTurns} data={dataTurns?.data || []}/>
                        </div>
                    </div>

                    <div className='d-flex flex-column gap-3'>
                        <Title icon={faClock} text={language.headings.TodaysReminders}/>

                        <div className='overflow-auto'  style={{ maxHeight: 'calc(100vh - 160px)' }}>
                            <ReminderList isLoading={isLoadingReminders} data={dataReminders?.data || []}/>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default Home