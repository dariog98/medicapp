import { faCalendarDays, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Title } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDate, useProfesionalEvents } from '../hooks'
import { AddEventButton, Calendar, Date, EventModal } from '../components/schedule'
import { ScheduleProvider } from '../components/providers/ScheduleProvider'

const Schedule = () => {
    const { id: idProfesional } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const { language, timeZone } = useSettingsContext()
    const { date } = useDate(searchParams.get('date'))
    const { data, refreshEvents } = useProfesionalEvents({idProfesional, date })

    const handleDate = (value) => {
        setSearchParams(params => {
            params.set('date', value)
            return params
        })
    }

    return (
        <ScheduleProvider idProfesional={idProfesional}>
            <Container>
                <div className='d-flex flex-column gap-3'>
                    <Title icon={faCalendarDays} text='Agenda'/>
                    <div className='d-grid gap-3' style={{ gridTemplateColumns: '1fr 3fr' }} >
                        <div className='d-flex flex-column gap-3'>
                            <Calendar currentDate={date} handleDate={handleDate}/>

                            <div className='d-flex gap-3'>
                                <AddEventButton currentDate={date}/>
                            </div>

                            <div className='alert alert-secondary'>
                                {timeZone.description}
                            </div>
                        </div>
                        <div>
                            <Date currentDate={date} events={data?.data || []}/>
                        </div>
                        <EventModal/>
                    </div>
                </div>
            </Container>
        </ScheduleProvider>
    )
}
export default Schedule