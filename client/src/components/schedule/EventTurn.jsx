import { getStringTimeInTimeZone } from '../../constants/dateToString'
import { useSettingsContext } from '../providers/SettingsProvider'
import { COLORS } from '../../constants/eventColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { TURN_STATUS } from '../../constants/turn'

function EventTurn({ data, handleOnClick }) {
    const { timeZone } = useSettingsContext()
    const startTime = getStringTimeInTimeZone(new Date(data.startTime), timeZone)
    const endTime   = getStringTimeInTimeZone(new Date(data.endTime), timeZone)
    const isConfirmed = data.status === TURN_STATUS.Confirmed

    return (
        <>
            <button
                className='border-0 flex-grow-1 rounded-2 p-0 my-2 me-3 text-white'
                style={{ backgroundColor: COLORS[data.id % COLORS.length], textAlign: 'inherit', opacity: isConfirmed ? '0.5' : '1' }}
                onClick={handleOnClick}
            >
                <div className='d-flex h-100'>
                    <div className='d-flex justify-content-center align-items-center p-2 border-end border-light'>
                        <FontAwesomeIcon icon={faUser}/>
                    </div>

                    <div className='flex-grow-1 px-2'>
                        <small>{`${startTime} - ${endTime}`}</small>
                        <div className='d-flex gap-2'>
                            <div className='fw-bold'>{`${data.patient.surnames} ${data.patient.names}`}</div>
                            {data.treatment && <><div>-</div><div>{data.treatment.description}</div></>}
                            {data.description && <><div>-</div><div>{data.description}</div></>}
                        </div>
                    </div>
                    {
                        isConfirmed &&
                        <div className='d-flex justify-content-center align-items-center p-2 border-start border-light'>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                    }
                </div>
            </button>
        </>
    )
}

export default EventTurn