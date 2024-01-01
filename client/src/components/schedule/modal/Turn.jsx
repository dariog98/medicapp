import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../constants/eventColors'
import { MODALMODES } from '../../../constants/modal'
import { Button, Input, Select, Textarea } from '../../basis'
import { useSettingsContext } from '../../providers/SettingsProvider'

const Turn = ({ isLoading, modalMode, form }) => {
    const { language } = useSettingsContext()

    if (modalMode === MODALMODES.Delete) {
        const { id: idTurn, time, description } = form.getValues()
        return (
            <div>
                <div>{language.messages.ConfirmDelete}</div>

                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[idTurn % COLORS.length] }}
                >
                    {`${time} hs`}
                    <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                        <div>{`${form.patient.surnames} ${form.patient.names}`}</div>
                    </div>
                    <div>{description}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger d-flex gap-2 align-items-center' onClick={form.handleSubmit} disabled={loading}>
                        Confirmar
                        <div
                            className='spinner-border'
                            style={{width: '1rem', height: '1rem', borderWidth: '2px', display: loading ? 'inherit' : 'none'}}
                        />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <form className='d-flex flex-column gap-3' onSubmit={form.handleSubmit}>
            
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
                        { value: '00:30:00', description: '30 minutos' },
                        { value: '01:00:00', description: '1 hora' },
                        { value: '01:30:00', description: '1 hora y 30 minutos' },
                        { value: '02:00:00', description: '2 horas' },
                    ]}
                />
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

export default Turn