import { faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../constants/eventColors'
import { MODALMODES } from '../../../constants/modal'
import { AutoComplete, Button, Input, Textarea } from '../../basis'
import { useSettingsContext } from '../../providers/SettingsProvider'
import { useState } from 'react'
import { usePatients } from '../../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Reminder = ({ isLoading, modalMode, form }) => {
    const { language } = useSettingsContext()
    const [search, setSearch] = useState('')
    const { isLoading: isLoadingPatients, data } = usePatients({ search })

    if (modalMode === MODALMODES.Delete) {
        const patient = form.patient
        const { id: idReminder, time, description } = form.getValues()

        return (
            <div>
                <div>{language.messages.ConfirmDelete}</div>
                
                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[idReminder % COLORS.length] }}
                >
                    {`${time} hs`}
                    {
                        patient &&
                        <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                            <div>{`${patient.surnames} ${patient.names}`}</div>
                        </div>
                    }
                    <div>{description}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <Button
                        className='btn-success'
                        icon={faCheck}
                        text={language.buttons.Confirm}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        handleOnClick={form.handleSubmit}
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
                        label={language.Patient}
                        before={<FontAwesomeIcon icon={faMagnifyingGlass} size='1x'/>}
                        name='patient'
                        handleSearch={setSearch}
                        isLoading={isLoadingPatients}
                        items={data?.data || []}
                        value={(item) => `${item.surnames} ${item.names}`}
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

export default Reminder