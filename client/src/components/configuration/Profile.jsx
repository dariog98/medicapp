import { faKey, faPen, faPowerOff, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useChangePasswordModal, useUserModal } from '../../hooks'
import { useUserContext } from '../providers/UserProvider'
import ChangePasswordModal from './ChangePasswordModal'
import UserModal from './UserModal'

const Profile = () => {
    const { language } = useSettingsContext()
    const { user, handleLogOut } = useUserContext()
    const { showModal, handleOpen, handleClose, form: formPassword } = useChangePasswordModal()
    const { showModal: showUserModal, handleOpen: handleOpenUserModal, handleClose: handleCloseUserModal, form: formUser } = useUserModal()

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faUserGear} text={language.Profile}/>

            <div className='d-flex flex-column gap-3'>
                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Surnames}
                            name='surnames'
                            type='text'
                            value={user.surnames}
                            isReadOnly={true}
                        />
                    </div>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Names}
                            name='names'
                            type='text'
                            value={user.names}
                            isReadOnly={true}
                        />
                    </div>
                </div>
                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Username}
                            name='username'
                            type='text'
                            value={user.username}
                            isReadOnly={true}
                        />
                    </div>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Charge}
                            name='charge'
                            value={user.charge.description}
                            isReadOnly={true}
                        />
                    </div>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Role}
                            name='role'
                            type='text'
                            value={user.role.description}
                            isReadOnly={true}
                        />
                    </div>
                </div>
                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Mail}
                            name='mail'
                            type='text'
                            value={user.mail}
                            isReadOnly={true}
                        />
                    </div>
                    <div className='flex-grow-1'>
                        <Input
                            label={language.rows.Phone}
                            name='phone'
                            type='text'
                            value={user.phone}
                            isReadOnly={true}
                        />
                    </div>
                </div>
            </div>

            <br/>
            
            <div className='d-flex gap-3'>
                <Button
                    className='btn-success'
                    icon={faPen}
                    text={language.buttons.Edit}
                    handleOnClick={handleOpenUserModal}
                />

                <Button
                    className='btn-danger'
                    icon={faKey}
                    text={language.buttons.ChangePassword}
                    handleOnClick={handleOpen}
                />

                <Button
                    className='btn-primary'
                    icon={faPowerOff}
                    text={language.buttons.LogOut}
                    handleOnClick={handleLogOut}
                />
            </div>

            <UserModal showModal={showUserModal} handleClose={handleCloseUserModal} form={formUser}/>
            <ChangePasswordModal showModal={showModal} handleClose={handleClose} form={formPassword}/>
        </div>
    )
}

export default Profile