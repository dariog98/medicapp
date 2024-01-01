import { Button, Modal, Textarea } from '../../basis'
import { MODALMODES } from '../../../constants/modal'
import { faCheck, faPen, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../../providers/SettingsProvider'

const NoteModal = ({ showModal, modalMode, handleClose, handleEdit, handleDelete, form, isLoading }) => {
    const { language } = useSettingsContext()
    const content = form.getValues('content')

    if (modalMode === MODALMODES.Preview) {
        return (
            <Modal title={language.Notes} show={showModal} modalSize='modal-lg' handleClose={handleClose}>
                <div className='d-flex flex-column gap-3'>

                    <div className='card-body text-truncate' style={{ whiteSpace: 'pre-wrap' }}>
                        {content}
                    </div>

                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            className='btn-success'
                            icon={faPen}
                            text={language.buttons.Edit}
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

    return (
        <Modal  title={language.Notes} show={showModal} modalSize='modal-lg' handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                {
                    modalMode === MODALMODES.Delete &&
                    <div>{language.messages.ConfirmDelete}</div>
                }

                <Textarea
                    form={form}
                    name='content'
                    placeholder={language.messages.WriteHere}
                    height='300px'
                    disabled={modalMode === MODALMODES.Delete}
                />

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-success'
                        icon={faCheck}
                        text={modalMode === MODALMODES.Delete ? language.buttons.Confirm : language.buttons.Save}
                        handleOnClick={form.handleSubmit}
                        isLoading={isLoading}
                        isDisabled={isLoading}
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

export default NoteModal