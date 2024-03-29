import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import PatientModal from './PatientModal'
import { usePatientModal } from '../../hooks'
import { MODALMODES } from '../../constants/modal'

const getYearsOlds = (birthdate) => {
    const ageDifferent = Date.now() - new Date(birthdate).getTime()
    const ageDate = new Date(ageDifferent)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const PatientData = ({ data, refreshData }) => {
    const { language } = useSettingsContext()
    const { showModal, handleOpen, handleClose, form, isLoading } = usePatientModal({ refreshData })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faUser} text={language.Patient}/>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Surnames}
                        name='surnames'
                        type='text'
                        value={data.surnames}
                        isReadOnly={true}
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Names}
                        name='names'
                        type='text'
                        value={data.names}
                        isReadOnly={true}
                    />
                </div>
            </div>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <Input
                        label='DNI'
                        name='dni'
                        type='number'
                        value={data.dni}
                        isReadOnly={true}
                    />
                </div>
                
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Birthdate}
                        name='birthdate'
                        type='date'
                        value={data.birthdate}
                        after={<div className='text-lowercase'>{`${getYearsOlds(data.birthdate)} ${language.messages.YearsOld}`}</div>}
                        isReadOnly={true}
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Phone}
                        name='phone'
                        type='text'
                        value={data.phone}
                        isReadOnly={true}
                    />
                </div>
            </div>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <Input
                        label={language.rows.Address}
                        name='address'
                        type='text'
                        value={data.address ?? ''}
                        isReadOnly={true}
                    />
                </div>
            </div>

            <div className='d-flex justify-content-end gap-2'>
                <Button
                    className='btn-success'
                    icon={faPen}
                    text={language.buttons.Edit}
                    handleOnClick={() => handleOpen(data, MODALMODES.Edit)}
                />
            </div>

            <PatientModal form={form} isLoading={isLoading} showModal={showModal} handleClose={handleClose}/>
        </div>
    )
}

export default PatientData