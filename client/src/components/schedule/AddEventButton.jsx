import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../basis'
import { useScheduleContext } from '../providers/ScheduleProvider'
import { getStringDateInTimeZone } from '../../constants/dateToString'
import { UTC } from '../../constants/time'

const AddEventButton = ({ currentDate }) => {
    const { handleOpen } = useScheduleContext()
    const date = getStringDateInTimeZone(currentDate, UTC)

    return (
        <Button
            className='btn-primary flex-grow-1'
            icon={faPlus}
            text='Add event'
            handleOnClick={() => handleOpen({ date })}
        />
    )
}

export default AddEventButton