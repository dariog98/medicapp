import { getStringDateInLanguageTimeZone } from '../../constants/dateToString'
import { useSettingsContext } from '../providers/SettingsProvider'
import { COLORS } from '../../constants/eventColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function EventException({ data, handleModal }) {
    const { language, timeZone } = useSettingsContext()
    const startDate = getStringDateInLanguageTimeZone(new Date(data.startTime), language.string, timeZone)
    const endDate = getStringDateInLanguageTimeZone(new Date(data.endTime), language.string, timeZone)

    return (
        <>
            <button
                className='border-0 flex-grow-1 rounded-2 p-0 m-2 text-white pattern2'
                style={{ backgroundColor: COLORS[data.id % COLORS.length], textAlign: 'inherit' }}
                onClick={() => handleModal(data)}
            >
                <div className='d-flex h-100'>
                    <div className='d-flex justify-content-center align-items-center p-2 border-end border-light'>
                        <FontAwesomeIcon icon={faLock}/>
                    </div>

                    <div className='d-flex flex-grow-1 justify-content-between px-2 py-1'>
                        <div className='d-flex flex-column'>
                            <small>{`${startDate} ${startTime} hs - ${endDate} ${endTime} hs`}</small>
                            {data.description && <div>{data.description}</div>}
                        </div>
                    </div>
                </div>
            </button>
        </>
    )
}

export default EventException