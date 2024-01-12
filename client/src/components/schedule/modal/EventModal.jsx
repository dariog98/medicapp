import { Button, Modal } from '../../basis'
import { useScheduleContext } from '../../providers/ScheduleProvider'
import { MODALMODES, MODALTABS } from '../../../constants/modal'
import { useSettingsContext } from '../../providers/SettingsProvider'
import Appointment from './Appointment'
import Exception from './Exception'
import Reminder from './Reminder'

const TABS = {
    [MODALTABS.Appointment]: Appointment,
    [MODALTABS.Exception]: Exception,
    [MODALTABS.Reminder]: Reminder,
}

const EventModal = () => {
    const {
        isLoading,
        showModal,
        handleClose,
        modalTab,
        handleModalTab,
        modalMode,
        appointmentForm,
        exceptionForm,
        reminderForm
    } = useScheduleContext()

    const FORMS = {
        [MODALTABS.Appointment]: appointmentForm,
        [MODALTABS.Exception]: exceptionForm,
        [MODALTABS.Reminder]: reminderForm,
    }

    const { language } = useSettingsContext()
    const isButtonsDisabled = modalMode !== MODALMODES.Add
    const Tab = TABS[modalTab]

    return (
        <Modal show={showModal} title={language.Events} handleClose={handleClose}>

            <div className='d-flex flex-column gap-4'>
                <div className='d-flex gap-2'>
                    <Button
                        className='btn-simple'
                        text={language.buttons.Appointment}
                        handleOnClick={() => handleModalTab(MODALTABS.Appointment)}
                        isActived={modalTab === MODALTABS.Appointment}
                        isDisabled={isButtonsDisabled}
                    />
                    <Button
                        className='btn-simple'
                        text={language.buttons.Reminder}
                        handleOnClick={() => handleModalTab(MODALTABS.Reminder)}
                        isActived={modalTab === MODALTABS.Reminder}
                        isDisabled={isButtonsDisabled}
                    />
                    <Button
                        className='btn-simple'
                        text={language.buttons.Exception}
                        handleOnClick={() => handleModalTab(MODALTABS.Exception)}
                        isActived={modalTab === MODALTABS.Exception}
                        isDisabled={isButtonsDisabled}
                    />
                </div>

                <Tab isLoading={isLoading} modalMode={modalMode} form={FORMS[modalTab]}/>
            </div>
            
        </Modal>
    )
}

export default EventModal