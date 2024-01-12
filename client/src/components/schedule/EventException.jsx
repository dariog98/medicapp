import { getStringDateTimeInLanguageTimeZone } from '../../constants/dateToString'
import { useSettingsContext } from '../providers/SettingsProvider'
import { COLORS } from '../../constants/eventColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const EventException = ({ data, handleOnClick }) => {
    const { language, timeZone } = useSettingsContext()
    const startDateTime = getStringDateTimeInLanguageTimeZone(new Date(data.startDateTime), language.string, timeZone)
    const endDateTime = getStringDateTimeInLanguageTimeZone(new Date(data.endDateTime), language.string, timeZone)

    return (
        <>
            <button
                className='border-0 flex-grow-1 rounded-2 p-0 my-2 me-3 text-white pattern'
                style={{ backgroundColor: COLORS[data.id % COLORS.length], textAlign: 'inherit' }}
                onClick={handleOnClick}
            >
                <div className='d-flex h-100'>
                    <div className='d-flex justify-content-center align-items-center p-2 border-end border-light'>
                        <FontAwesomeIcon icon={faLock}/>
                    </div>

                    <div className='d-flex flex-grow-1 justify-content-between px-2 py-1'>
                        <div className='d-flex flex-column'>
                            <small>{`${startDateTime} hs - ${endDateTime} hs`}</small>
                            {data.description && <div>{data.description}</div>}
                        </div>
                    </div>
                </div>
            </button>
        </>
    )
}

export default EventException