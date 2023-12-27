import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Modal } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const PatientModal = ({ showModal, modalMode, form, handleClose }) => {
    const { language } = useSettingsContext()

    return (
        <Modal show={showModal} title={language.Patient} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                <Input
                    form={form}
                    label='DNI'
                    name='dni'
                    type='text'
                />

                <Input
                    form={form}
                    label={language.rows.Surnames}
                    name='surnames'
                    type='text'
                />

                <Input
                    form={form}
                    label={language.rows.Names}
                    name='names'
                    type='text'
                />

                <Input
                    form={form}
                    label={language.rows.Birthdate}
                    name='birthdate'
                    type='date'
                />

                <Input
                    form={form}
                    label={language.rows.Phone}
                    name='phone'
                    type='text'
                />

                <Input
                    form={form}
                    label={language.rows.Address}
                    name='address'
                    type='text'
                />

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-outline-success'
                        text={language.buttons.Save}
                        icon={faCheck}
                        handleOnClick={form.handleSubmit}
                    />

                    <Button
                        className='btn-outline-danger'
                        text={language.buttons.Cancel}
                        icon={faX}
                        handleOnClick={handleClose}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default PatientModal