import { faCalendarDays, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Container, Title, TurnList } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useTurns } from '../hooks'
import { getStringDateInTimeZone, newDateInTimeZone } from '../constants/dateToString'
import { useState } from 'react'

const Home = () => {
    const { language, timeZone } = useSettingsContext()
    const [year, month, date] = getStringDateInTimeZone(new Date(), timeZone).split('-')
    const [startTime] = useState(newDateInTimeZone(timeZone, year, month, date))
    const [endTime] = useState(newDateInTimeZone(timeZone, year, month, date, 23, 59))

    const { isLoading, data } = useTurns({ startTime, endTime })

    return (
        <Container>
            <div className='d-flex flex-column gap-3'>
                <Title icon={faHouse} text={language.Home}/>

                <div className='d-grid gap-3' style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>

                    </div>

                    <div className='d-flex flex-column gap-3'>
                        <Title icon={faCalendarDays} text={language.headings.TodaysTurns}/>

                        <div className='overflow-auto pe-4'  style={{ maxHeight: 'calc(100vh - 160px)' }}>
                        <TurnList data={data?.data || []}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Home