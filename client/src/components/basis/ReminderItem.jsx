import { useNavigate } from 'react-router-dom'
import { getStringDateInTimeZone, getStringDateTimeInLanguageTimeZone, getStringMonthInLanguageTimeZone, getStringTimeInTimeZone } from '../../constants/dateToString'
import { COLORS } from '../../constants/eventColors'
import { useSettingsContext } from '../providers/SettingsProvider'
import { ROUTES } from '../../constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faCalendarDays, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

const ReminderItem = ({ data }) => {
    const { timeZone, language } = useSettingsContext()
    const navigate = useNavigate()
    const date = new Date(data.dateTime)
    const stringDate = getStringDateTimeInLanguageTimeZone(new Date(data.dateTime), language.string, timeZone)

    const handleGoToSchedule = () => {
        navigate(`${ROUTES.Profesionals}/${data.profesional.id}/schedule?date=${getStringDateInTimeZone(date, timeZone)}`)
    }

    const [year, _, day] = getStringDateInTimeZone(date, timeZone).split('-') 
    const month = getStringMonthInLanguageTimeZone(date, language.string, timeZone)

    return (
        <div
            className='card text-light'
            style={{ backgroundColor: COLORS[data.id % COLORS.length], border: 0 }}
        >
            <div className='card-body d-flex'>
                <div className='flex-grow-1'>
                    <div>{stringDate}</div>
                    <div className='d-flex gap-2 align-items-center'>
                        <FontAwesomeIcon icon={faUserDoctor}/>
                        <div className='m-0 p-0'>{`${data.profesional.surnames} ${data.profesional.names}`}</div>
                    </div>

                    {
                        data.patient &&
                        <div className='d-flex gap-2 align-items-center'>
                            <FontAwesomeIcon icon={faUser}/>
                            <div className='m-0 p-0 fw-medium fs-5'>{`${data.patient.surnames} ${data.patient.names}`}</div>
                        </div>
                    }
                    <div>{data.description}</div>
                </div>
                <div className='d-flex align-items-end'>
                    <Button
                        className='btn-outline-light'
                        icon={faCalendarDays}
                        title={language.buttons.SeeOnAgenda}
                        style={{ width: '2.5rem', height: '2.5rem' }}
                        handleOnClick={handleGoToSchedule}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReminderItem