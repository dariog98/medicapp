import { faPowerOff, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useUserForm } from '../../hooks'
import { useUserContext } from '../providers/UserProvider'

const Profile = () => {
    const { language } = useSettingsContext()
    const { handleLogOut } = useUserContext()
    const { form } = useUserForm()

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faUserGear} text={language.Profile}/>

            <div className='d-flex flex-column gap-3'>
                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Surnames} name='surnames' type='text'/></div>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Names} name='names' type='text'/></div>
                </div>
                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Username} name='username' type='text'/></div>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Charge} name='charge' type='select'/></div>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Role} name='role' type='text' isDisabled={true}/></div>
                </div>
                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Mail} name='mail' type='text'/></div>
                    <div className='flex-grow-1'><Input form={form} label={language.rows.Phone} name='phone' type='text'/></div>
                </div>
            </div>

            <br/>
            
            <div>
                <Button
                    className='btn-primary'
                    icon={faPowerOff}
                    text={language.buttons.LogOut}
                    handleOnClick={handleLogOut}
                />
            </div>
        </div>
    )
}

export default Profile