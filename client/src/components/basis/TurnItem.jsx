import { useNavigate } from 'react-router-dom'
import { getStringDateInTimeZone, getStringMonthInLanguageTimeZone, getStringTimeInTimeZone } from '../../constants/dateToString'
import { PASTEL_COLORS } from '../../constants/eventColors'
import { useSettingsContext } from '../providers/SettingsProvider'
import { ROUTES } from '../../constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

const TurnItem = ({ data }) => {
    const { isThemeDark, timeZone, language } = useSettingsContext()
    const navigate = useNavigate()
    const date = new Date(data.dateTime)

    const handleGoToSchedule = () => {
        navigate(`${ROUTES.Profesionals}/${data.profesional.id}/schedule?date=${getStringDateInTimeZone(date, timeZone)}`)
    }

    const [year, _, day] = getStringDateInTimeZone(date, timeZone).split('-') 
    const month = getStringMonthInLanguageTimeZone(date, language.string, timeZone)

    return (
        <div className='card d-flex flex-row p-0 overflow-hidden'>
            <div
                className={`d-flex flex-column justify-content-center align-items-center py-2 ${isThemeDark ? 'text-light' : 'text-dark'}`}
                style={{ width: '100px', backgroundColor: `${PASTEL_COLORS[day % PASTEL_COLORS.length]}90` }}
            >
                <div className='fs-3 fw-bold'>{Number(day)}</div>
                <div className='fs-5 fw-bolder text-uppercase'>{month.slice(0, 3)}</div>
                <div className='fs-6'>{year}</div>
            </div>

            <div className='border-start flex-grow-1 p-2'>
                <small>{`${getStringTimeInTimeZone(date, timeZone)} hs`}</small>
                <h5>{`${data.profesional.surnames} ${data.profesional.names}`}</h5>
                <div>{`${data.patient.surnames} ${data.patient.names}`}</div>
                <div className='d-flex gap-2 align-items-end'>
                {data.treatment && <div>{data.treatment.description}</div>}
                <small><i>{data.description}</i></small>
                </div>
            </div>
            <div className='d-flex p-2 align-items-end'>
                <div>
                    <Button
                        className='btn-outline-system'
                        icon={faCalendarDays}
                        title={language.buttons.SeeOnAgenda}
                        style={{ width: '2.5rem', height: '2.5rem' }}
                        handleOnClick={handleGoToSchedule}
                    />
                </div>
            </div>
            {
                data.status === 1 &&
                <div className='d-flex justify-content-center align-items-center p-2 border-start'>
                    <FontAwesomeIcon icon={faCircleCheck} size='x1'/>
                </div>
            }
        </div>
    )
}

export default TurnItem