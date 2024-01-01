import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { UTC } from '../../constants/time'
import { useSettingsContext } from '../providers/SettingsProvider'
import { getStringDateInLanguageTimeZone, getStringDateInTimeZone } from '../../constants/dateToString'
import { Button } from '../basis'
import { getEventHeight, getEventPositionY } from '../../constants/schedule'
import EventTurn from './EventTurn'
import EventContainer from './EventContainer'
import EventException from './EventException'

const rows = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
]

const buttonStyle = { width: '2.5rem', height: '2.5rem' }

const DateEvents = ({ currentDate, events }) => {
    const { language, timeZone } = useSettingsContext()

    const day = getStringDateInTimeZone(currentDate, UTC)
    const dateStart = new Date(`${day}T00:00:00${timeZone.numeric}`)
    const dateEnd   = new Date(`${day}T23:59:00${timeZone.numeric}`)

    const rowHeight = 100 / rows.length

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center m-2'>
                <h4>{getStringDateInLanguageTimeZone(currentDate, language.string, UTC)}</h4>

                <div className='d-flex gap-2'>
                    <Button
                        className='btn-outline-system rounded-circle'
                        style={buttonStyle}
                        icon={faArrowLeft}
                        //handleOnClick={goToPrevMonth}
                    />
                    <Button
                        className='btn-outline-system rounded-circle'
                        style={buttonStyle}
                        icon={faArrowRight}
                        //handleOnClick={goToNextMonth}
                    />
                </div>
            </div>

            <div className='card' style={{ maxHeight: 'calc(100vh - 160px)' }}>
                <div className='overflow-auto'>
                    <div className='position-relative'>
                        {
                            rows.map((time, index) => 
                                <div key={index} className={`d-flex border-bottom`} style={{ height: '4rem', borderBottomStyle: index % 2 ? 'dotted' : 'solid' }}>
                                    <div className='px-4 align-top text-center'>
                                        {time}
                                    </div>
                                    <div className='flex-grow-1'/>
                                </div>
                            )
                        }
                        <div className='position-absolute' style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                            {
                                events.turn?.map(event =>
                                    <EventContainer key={event.id} data={event} rowHeight={rowHeight} dateStart={dateStart} dateEnd={dateEnd}>
                                        <EventTurn data={event}/>
                                    </EventContainer>
                                )
                            }
                            {
                                events.exception?.map(event =>
                                    <EventContainer key={event.id} data={event} rowHeight={rowHeight} dateStart={dateStart} dateEnd={dateEnd}>
                                        <EventException data={event}/>
                                    </EventContainer>
                                )
                            }
                        </div>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default DateEvents