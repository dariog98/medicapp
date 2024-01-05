import { faCheck, faPen, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Modal } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { MODALMODES } from '../../constants/modal'

const TreatmentModal = ({ showModal, modalMode, handleClose, form, isLoading, handleEdit, handleDelete }) => {
    const { language } = useSettingsContext()

    if (modalMode === MODALMODES.Preview) {
        return (
            <Modal title={language.headings.Treatment} show={showModal} handleClose={handleClose}>
                <div className='d-flex flex-column gap-3'>
                    <Input
                        form={form}
                        label={language.rows.Description}
                        type='text'
                        name='description'
                        isDisabled={true}
                        isReadOnly={true}
                    />
    
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            className='btn-success'
                            icon={faPen}
                            text={language.buttons.Edit}
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            handleOnClick={handleEdit}
                        />
    
                        <Button
                            className='btn-danger'
                            icon={faTrashCan}
                            text={language.buttons.Delete}
                            handleOnClick={handleDelete}
                        />
                    </div>
                </div>
            </Modal>
        )
    }

    if (modalMode === MODALMODES.Delete) {
        return (
            <Modal title={language.headings.Treatment} show={showModal} handleClose={handleClose}>
                <div className='d-flex flex-column gap-3'>
                    
                    <div>{language.messages.ConfirmDelete}</div>
                    
                    <Input
                        form={form}
                        label={language.rows.Description}
                        type='text'
                        name='description'
                        isDisabled={true}
                        isReadOnly={true}
                    />
    
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            className='btn-success'
                            icon={faCheck}
                            text={language.buttons.Confirm}
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            handleOnClick={form.handleSubmit}
                        />

                        <Button
                            className='btn-danger'
                            icon={faX}
                            text={language.buttons.Cancel}
                            handleOnClick={handleClose}
                        />
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal title={language.headings.Treatment} show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                <Input
                    form={form}
                    label={language.rows.Description}
                    type='text'
                    name='description'
                />

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-success'
                        icon={faCheck}
                        text={modalMode === MODALMODES.Add ? language.buttons.Confirm : language.buttons.Save}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        handleOnClick={form.handleSubmit}
                    />

                    <Button
                        className='btn-danger'
                        icon={faX}
                        text={language.buttons.Cancel}
                        handleOnClick={handleClose}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default TreatmentModal