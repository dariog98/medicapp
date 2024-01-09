import { Button, Modal } from '../../basis'
import { useScheduleContext } from '../../providers/ScheduleProvider'
import { MODALMODES, MODALTABS } from '../../../constants/modal'
import { useSettingsContext } from '../../providers/SettingsProvider'
import Turn from './Turn'
import Exception from './Exception'
import Reminder from './Reminder'

const TABS = {
    [MODALTABS.Turns]: Turn,
    [MODALTABS.Exceptions]: Exception,
    [MODALTABS.Reminders]: Reminder,
}

const EventModal = () => {
    const {
        isLoading,
        showModal,
        handleClose,
        modalTab,
        handleModalTab,
        modalMode,
        turnForm,
        exceptionForm,
        reminderForm
    } = useScheduleContext()

    const FORMS = {
        [MODALTABS.Turns]: turnForm,
        [MODALTABS.Exceptions]: exceptionForm,
        [MODALTABS.Reminders]: reminderForm,
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
                        text={language.buttons.Turn}
                        handleOnClick={() => handleModalTab(MODALTABS.Turns)}
                        isActived={modalTab === MODALTABS.Turns}
                        isDisabled={isButtonsDisabled}
                    />
                    <Button
                        className='btn-simple'
                        text={language.buttons.Reminder}
                        handleOnClick={() => handleModalTab(MODALTABS.Reminders)}
                        isActived={modalTab === MODALTABS.Reminders}
                        isDisabled={isButtonsDisabled}
                    />
                    <Button
                        className='btn-simple'
                        text={language.buttons.Exception}
                        handleOnClick={() => handleModalTab(MODALTABS.Exceptions)}
                        isActived={modalTab === MODALTABS.Exceptions}
                        isDisabled={isButtonsDisabled}
                    />
                </div>

                <Tab isLoading={isLoading} modalMode={modalMode} form={FORMS[modalTab]}/>
            </div>
            
        </Modal>
    )
}

export default EventModal