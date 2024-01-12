import { faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../constants/eventColors'
import { MODALMODES } from '../../../constants/modal'
import { AutoComplete, Button, Input, Select, Textarea } from '../../basis'
import { useSettingsContext } from '../../providers/SettingsProvider'
import { usePatients, useProfesionalTreatments } from '../../../hooks'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScheduleContext } from '../../providers/ScheduleProvider'

const Appointment = ({ isLoading, modalMode, form }) => {
    const { language } = useSettingsContext()
    const { idProfesional } = useScheduleContext()
    const [searchPatient, setSearchPatient] = useState('')
    const [searchTreatment, setSearchTreatment] = useState('')
    const { isLoading: isLoadingPatients, data: dataPatients } = usePatients({ search: searchPatient })
    const { isLoading: isLoadingTreatments, data: dataTreatments} = useProfesionalTreatments({ idProfesional, search: searchTreatment })

    if (modalMode === MODALMODES.Delete) {
        const { id: idTurn, time, description, patient } = form.getValues()

        return (
            <div>
                <div>{language.messages.ConfirmDelete}</div>

                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[idTurn % COLORS.length] }}
                >
                    {`${time} hs`}
                    <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                        <div>{`${patient.surnames} ${patient.names}`}</div>
                    </div>
                    <div>{description}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <Button
                        className='btn-success'
                        icon={faCheck}
                        text={language.buttons.Confirm}
                        handleOnClick={form.handleSubmit}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    />
                </div>
            </div>
        )
    }

    return (
        <form className='d-flex flex-column gap-3' onSubmit={form.handleSubmit}>

            <div>
                <div className='flex-grow-1'>
                    <AutoComplete
                        form={form}
                        label={language.rows.Patient}
                        before={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                        name='patient'
                        handleSearch={setSearchPatient}
                        isLoading={isLoadingPatients}
                        items={dataPatients?.data || []}
                        value={(item) => `${item.surnames} ${item.names}`}
                        isRequired={true}
                        isDisabled={modalMode !== MODALMODES.Add}
                        defaultValue={form.getValues('patient')}
                    />
                </div>
            </div>
            
            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <Input
                        form={form}
                        label={language.rows.Date}
                        name='date'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        form={form}
                        label={language.rows.Time}
                        name='time'
                        type='time'
                    />
                </div>
            </div>

            <div>
                <Select
                    form={form}
                    label={language.rows.Duration}
                    name='duration'
                    type='select'
                    options={[
                        { value: '00:30:00', label: language.durations.ThirtyMinutes },
                        { value: '01:00:00', label: language.durations.OneHour },
                        { value: '01:30:00', label: language.durations.OneHourThirtyMinutes },
                        { value: '02:00:00', label: language.durations.TwoHours },
                    ]}
                />
            </div>

            <div>
                <div className='flex-grow-1'>
                    <AutoComplete
                        form={form}
                        label={language.rows.Treatment}
                        before={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                        name='treatment'
                        handleSearch={setSearchTreatment}
                        isLoading={isLoadingTreatments}
                        items={dataTreatments?.data || []}
                        value={(item) => item.description}
                        defaultValue={form.getValues('treatment')}
                    />
                </div>
            </div>

            <div>
                <Textarea
                    form={form}
                    label={language.rows.Description}
                    name='description'
                    placeholder={language.messages.WriteHere}
                    height='128px'
                />
            </div>


            <div className='d-flex justify-content-end'>
                <Button
                    className='btn-success'
                    icon={faCheck}
                    text={language.buttons.Save}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                />
            </div>
        </form>
    )
}

export default Appointment