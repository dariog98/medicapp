import { Input } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const getYearsOlds = (birthdate) => {
    const ageDifferent = Date.now() - new Date(birthdate).getTime()
    const ageDate = new Date(ageDifferent)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const PatientData = ({ data }) => {
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-4'>
            
            <form className='d-flex flex-column gap-3'>
                <div className='row'>
                    <div className='col'>
                        <Input
                            label={language.rows.Surnames}
                            name='surnames'
                            type='text'
                            value={data.surnames}
                            isDisabled={true}
                        />
                    </div>

                    <div className='col'>
                        <Input
                            label={language.rows.Names}
                            name='names'
                            type='text'
                            value={data.names}
                            isDisabled={true}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg'>
                        <Input
                            label='DNI'
                            name='dni'
                            type='number'
                            value={data.dni}
                            isDisabled={true}
                        />
                    </div>
                    
                    <div className='col-lg'>
                        <Input
                            label={language.rows.Birthdate}
                            name='birthdate'
                            type='date'
                            value={data.birthdate}
                            after={<div className='text-lowercase'>{`${getYearsOlds(data.birthdate)} ${language.messages.YearsOld}`}</div>}
                            isDisabled={true}
                        />
                    </div>

                    <div className='col-lg'>
                        <Input
                            label={language.rows.Phone}
                            name='phone'
                            type='text'
                            value={data.phone}
                            isDisabled={true}
                        />
                    </div>
                </div>

                <div className='row'>
                    <Input
                        label={language.rows.Address}
                        name='address'
                        type='text'
                        value={data.address ?? ''}
                        isDisabled={true}
                    />
                </div>
            </form>
        </div>
    )
}

export default PatientData