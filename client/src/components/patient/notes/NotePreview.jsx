import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from '../../basis'
import { useSettingsContext } from '../../providers/SettingsProvider'

const NotePreview = ({ showModal, handleClose, form, handleEdit, handleDelete }) => {
    const { language } = useSettingsContext()
    const content = form.getValues('content')
    
    return (
        <Modal title={language.Notes} show={showModal} modalSize='modal-lg' handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>

                <div className='card-body text-truncate' style={{ whiteSpace: 'pre-wrap' }}>
                    {content}
                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-success'
                        Icon={faPen}
                        text={language.buttons.Edit}
                        handleOnClick={handleEdit}
                    />
                    <Button
                        className='btn-danger'
                        Icon={faTrash}
                        text={language.buttons.Delete}
                        handleOnClick={handleDelete}
                    />
                </div>
                
            </div>
        </Modal>
    )
}

export default NotePreview