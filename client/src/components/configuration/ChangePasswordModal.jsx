import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, Password } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useSwitch } from '../../hooks'

const ChangePasswordModal = ({ showModal, handleClose, form }) => {
    const { language } = useSettingsContext()
    const { mode, toggleSwitch } = useSwitch()

    return (
        <Modal title={language.buttons.ChangePassword} show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>

                <div className='d-flex flex-column gap-3'>

                    <Password
                        form={form}
                        label={language.rows.CurrentPassword}
                        name='currentPassword'
                        see={mode}
                        handleSee={toggleSwitch}
                    />

                    <Password
                        form={form}
                        label={language.rows.NewPassword}
                        name='password'
                        see={mode}
                        handleSee={toggleSwitch}
                    />
                    
                    <Password
                        form={form}
                        label={language.rows.ConfirmPassword}
                        name='confirmPassword'
                        see={mode}
                        handleSee={toggleSwitch}
                    />

                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            className='btn-success'
                            icon={faCheck}
                            text={language.buttons.Confirm}
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

            </div>
        </Modal>
    )
}

export default ChangePasswordModal