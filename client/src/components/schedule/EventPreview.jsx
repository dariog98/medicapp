import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../constants/eventColors'
import { Button, Modal } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { getStringDateTimeInLanguageTimeZone, getStringTimeInTimeZone } from '../../constants/dateToString'
import { MODALMODES, MODALTABS } from '../../constants/modal'
import { useScheduleContext } from '../providers/ScheduleProvider'

const TYPES = {
    'exception': MODALTABS.Exception,
    'reminder': MODALTABS.Reminder,
    'appointment': MODALTABS.Appointment
}

const EventPreview = ({ data, showModal, handleClose }) => {
    const { language, timeZone } = useSettingsContext()
    const { id, type, patient, description, treatment, startTime, endTime } = data || {}
    const isReminder = type === 'reminder'
    const isException = type === 'exception'
    const startDateTime = getStringDateTimeInLanguageTimeZone(new Date(startTime), language.string, timeZone)
    const endDateTime = isException ? getStringDateTimeInLanguageTimeZone(new Date(endTime), language.string, timeZone) : getStringTimeInTimeZone(new Date(endTime), timeZone)

    const { handleOpen } = useScheduleContext()

    const handleEdit = () => {
        handleOpen(data, TYPES[type], MODALMODES.Edit)
        handleClose()
    }

    const handleDelete = () => {
        handleOpen(data, TYPES[type], MODALMODES.Delete)
        handleClose()
    }

    return (
        <Modal
            title={isReminder ? language.buttons.Reminder : isException ? language.buttons.Exception : language.buttons.Appointment}
            show={showModal}
            handleClose={handleClose}
            className={isException ? 'text-light pattern' : 'text-light'}
            style={{ backgroundColor: COLORS[id % COLORS.length], borderWidth: 0 }}
            classButton='btn-outline-light rounded-circle'
        >
            <div className='d-flex flex-column gap-3'>

                <div>
                    <div className='d-flex gap-2'>
                        <small>{startDateTime}</small>
                        {!isReminder && <><small>-</small><small>{endDateTime}</small></>}
                    </div>

                    {patient && <h5 className='m-0'>{`${patient.surnames} ${patient.names}`}</h5>}
                    {treatment && <div>{treatment.description}</div>}
                    {description && <div>{description}</div>}
                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-outline-light'
                        icon={faPen}
                        text={language.buttons.Edit}
                        handleOnClick={handleEdit}
                    />
                    
                    <Button
                        className='btn-outline-light'
                        icon={faTrashCan}
                        text={language.buttons.Delete}
                        handleOnClick={handleDelete}
                    />
                </div>

            </div>
        </Modal>
    )
}

export default EventPreview