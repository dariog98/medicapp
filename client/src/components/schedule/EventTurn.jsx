import { getStringTimeInTimeZone } from '../../constants/dateToString'
import { useSettingsContext } from '../providers/SettingsProvider'
import { COLORS } from '../../constants/eventColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { TURN_STATUS } from '../../constants/turn'
import { useScheduleContext } from '../providers/ScheduleProvider'
import { MODALMODES, MODALTABS } from '../../constants/modal'

function EventTurn({ data }) {
    const { timeZone } = useSettingsContext()
    const startTime = getStringTimeInTimeZone(new Date(data.startTime), timeZone)
    const endTime   = getStringTimeInTimeZone(new Date(data.endTime), timeZone)
    const isConfirmed = data.status === TURN_STATUS.Confirmed
    const { handleOpen } = useScheduleContext()

    return (
        <>
            <button
                className='border-0 flex-grow-1 rounded-2 p-0 m-2 text-white'
                style={{ backgroundColor: COLORS[data.id % COLORS.length], textAlign: 'inherit', opacity: isConfirmed ? '0.5' : '1' }}
                onClick={() => handleOpen(data, MODALTABS.Turns, MODALMODES.Edit)}
            >
                <div className='d-flex h-100'>
                    <div className='d-flex justify-content-center align-items-center p-2 border-end border-light'>
                        <FontAwesomeIcon icon={faUser}/>
                    </div>

                    <div className='d-flex flex-grow-1 justify-content-between px-2'>
                        <div>
                            <div className='d-flex gap-2'>
                                <div>{`${startTime} hs - ${endTime} hs`}</div>
                                {data.description && <div>{data.description}</div>}                 
                            </div>
                            <div className='fw-bold'>
                                <div>{`${data.patient.surnames} ${data.patient.names}`}</div>
                            </div>
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