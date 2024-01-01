import { Button, Modal } from '../../basis'
import { useScheduleContext } from '../../providers/ScheduleProvider'
import { MODALMODES, MODALTABS } from '../../../constants/modal'
import Turn from './Turn'
import Exception from './Exception'
import Reminder from './Reminder'
import { useSettingsContext } from '../../providers/SettingsProvider'

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
    const { language } = useSettingsContext()

    const isButtonsDisabled = modalMode !== MODALMODES.Add

    return (
        <Modal show={showModal} title='Eventos' handleClose={handleClose}>

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

                <div>
                    {modalTab === MODALTABS.Turns && <Turn isLoading={isLoading} modalMode={modalMode} form={turnForm}/>}
                    {modalTab === MODALTABS.Reminders && <Reminder isLoading={isLoading} modalMode={modalMode} form={reminderForm}/>}
                    {modalTab === MODALTABS.Exceptions && <Exception isLoading={isLoading} modalMode={modalMode} form={exceptionForm}/>}        
                </div>
            </div>
            
        </Modal>
    )
}

export default EventModal