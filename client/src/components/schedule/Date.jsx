import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { UTC } from '../../constants/time'
import { useSettingsContext } from '../providers/SettingsProvider'
import { getStringDateInLanguageTimeZone, getStringDateInTimeZone } from '../../constants/dateToString'
import { Button } from '../basis'
import { useEventPreviewModal, useSwitch } from '../../hooks'
import { useScheduleContext } from '../providers/ScheduleProvider'
import { MODALMODES, MODALTABS } from '../../constants/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timesRows } from '../../constants/timesRows'

import EventContainer from './EventContainer'
import EventAppointment from './EventAppointment'
import EventException from './EventException'
import EventReminder from './EventReminder'
import EventPreview from './EventPreview'

const DateEvents = ({ currentDate, events }) => {
    const { language, timeZone } = useSettingsContext()
    const { handleOpen } = useScheduleContext()
    const { mode, onSwitch, offSwitch } = useSwitch()
    const previewModal = useEventPreviewModal()

    const day = getStringDateInTimeZone(currentDate, UTC)
    const dateStart = new Date(`${day}T00:00:00${timeZone.numeric}`)
    const dateEnd   = new Date(`${day}T23:59:00${timeZone.numeric}`)

    const rowHeight = 100 / timesRows.length

    return (
        <div>
            <div className='d-flex justify-content-between align-items-end'>
                <div className='d-flex'>
                    <Button
                        className='btn-outline-system rounded-0 rounded-top border-bottom-0'
                        handleOnClick={offSwitch}
                        isActived={!mode}
                        text={language.Appointments}
                    />
                    <Button
                        className='btn-outline-system rounded-0 rounded-top border-bottom-0'
                        handleOnClick={onSwitch}
                        isActived={mode}
                        text='Reminders'
                    />
                </div>

                <div className='d-flex align-items-center gap-2 m-2'>
                    <h4>{getStringDateInLanguageTimeZone(currentDate, language.string, UTC)}</h4>
                </div>
            </div>

            <div className='card' style={{ height: 'calc(100vh - 160px)', maxHeight: 'calc(100vh - 160px)', borderTopLeftRadius: 0 }}>
                <div className='overflow-auto'>
                    {
                        !mode ?
                        <div className='position-relative'>
                            {
                                timesRows.map((time, index) =>
                                    <div key={index} className={`d-flex border-bottom ${index % 2 ? 'border-bottom-solid' : 'border-bottom-dotted' }`} style={{ height: '4rem' }}>
                                        <div className='align-top text-center' style={{ width: '15%' }}>
                                            {time}
                                        </div>
                                        <div className='flex-grow-1 d-flex add-turn-container'>
                                            <div
                                                className='add-turn d-flex align-items-center text-bg-primary my-2 me-3 p-2 rounded-2'
                                                onClick={() => handleOpen({ date: day, time }, MODALTABS.Turns, MODALMODES.Add)}
                                            >
                                                {`${language.buttons.AddAppointmentTo} ${time}`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='position-absolute' style={{ top: 0, bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
                                {
                                    events.appointment?.map(event =>
                                        <EventContainer key={event.id} data={event} rowHeight={rowHeight} dateStart={dateStart} dateEnd={dateEnd}>
                                            <EventAppointment data={event} handleOnClick={() => previewModal.handleOpen(event)}/>
                                        </EventContainer>
                                    )
                                }
                                {
                                    events.exception?.map(event =>
                                        <EventContainer key={event.id} data={event} rowHeight={rowHeight} dateStart={dateStart} dateEnd={dateEnd}>
                                            <EventException data={event} handleOnClick={() => previewModal.handleOpen(event)}/>
                                        </EventContainer>
                                    )
                                }
                            </div>
                        </div>
                        :
                        <div className='d-flex flex-column gap-3 m-3'>
                            {
                                events.reminder?.map(event =>
                                    <EventReminder key={event.id} data={event} handleOnClick={() => previewModal.handleOpen(event)}/>
                                )
                            }
                            <div className='add-turn-container'>
                                <div
                                    className='add-turn d-flex align-items-center text-bg-primary p-2 rounded-2 gap-2'
                                    style={{ height: '4rem' }}
                                    onClick={() => handleOpen({ date: day }, MODALTABS.Reminder, MODALMODES.Add)}
                                >
                                    <FontAwesomeIcon icon={faPlus}/>
                                    {`Add reminder`}
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <EventPreview data={previewModal.data} showModal={previewModal.showModal} handleClose={previewModal.handleClose}/>
        </div>
    )
}

export default DateEvents