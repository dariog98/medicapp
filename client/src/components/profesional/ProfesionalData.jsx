import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Button, Input } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const ProfesionalData = ({ profesional }) => {
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>

            <div className='d-flex gap-3 flex-wrap'>
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Surnames}
                        name='surnames'
                        type='text'
                        isDisabled={true}
                        value={profesional.surnames}
                    />
                </div>
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Names}
                        name='names'
                        type='text'
                        isDisabled={true}
                        value={profesional.names}
                    />
                </div>
            </div>

            <div className='d-flex gap-3 flex-wrap'>
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Mail}
                        name='mail'
                        type='text'
                        isDisabled={true}
                        value={profesional.mail}
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Phone}
                        name='phone'
                        type='text'
                        isDisabled={true}
                        value={profesional.phone}
                    />
                </div>
            </div>

            <div className='d-flex gap-3 flex-wrap'>
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Username}
                        name='mail'
                        type='text'
                        isDisabled={true}
                        value={profesional.username}
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Role}
                        name='phone'
                        type='text'
                        isDisabled={true}
                        value={profesional.role.description}
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Charge}
                        name='phone'
                        type='text'
                        isDisabled={true}
                        value={profesional.charge.description}
                    />
                </div>
            </div>

            <div className='d-flex justify-content-end gap-2'>
                <Button
                    className='btn-success'
                    icon={faPen}
                    text={language.buttons.Edit}
                />
            </div>
            
        </div>
    )
}

export default ProfesionalData