import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, InputV2, ModalTemplate } from '../../basis'
import { MODALMODES } from '../../../constants/modal'

const NoteModal = ({ showModal, modalMode, handleClose, formManager }) => {
    return (
        <ModalTemplate show={showModal} modalSize='modal-lg' handleClose={handleClose} title='Nota'>
            <div className='d-flex flex-column gap-3'>
                {
                    modalMode === MODALMODES.Delete &&
                    <div>¿Seguro que desea eliminar la siguiente nota?</div>
                }
                <InputV2
                    formManager={{ ...formManager, errors: formManager?.formState.errors }}
                    name='content'
                    type='textarea'
                    placeholder='Escriba aquí....'
                    height='300px'
                    disabled={modalMode === MODALMODES.Delete}
                />

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-outline-success'
                        Icon={CheckIcon}
                        text={modalMode === MODALMODES.Delete ? 'Confirmar' : 'Guardar'}
                        handleOnClick={formManager.handleSubmit}
                        isLoading={formManager.isLoading}
                        isDisabled={formManager.isLoading}
                    />
                    <Button
                        className='btn-outline-danger'
                        Icon={XMarkIcon}
                        text='Cancelar'
                        handleOnClick={handleClose}
                    />
                </div>
                
            </div>
        </ModalTemplate>
    )
}

export default NoteModal