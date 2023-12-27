import { Input } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const ProfesionalData = ({ profesional }) => {
    const { language } = useSettingsContext()

    return (
        <div>
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

            </div>
        </div>
    )
}

export default ProfesionalData