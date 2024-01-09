import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../constants/eventColors'
import { MODALMODES } from '../../../constants/modal'
import { Button, Input, Textarea } from '../../basis'
import { useSettingsContext } from '../../providers/SettingsProvider'

const Exception = ({ isLoading, modalMode, form }) => {
    const { language } = useSettingsContext()

    if (modalMode === MODALMODES.Delete) {
        const { id: idException, startDate, startTime, endDate, endTime, description } = form.getValues()
        return (
            <div>
                <div>¿Confirma que desea eliminar la siguiente excepción?</div>

                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[idException % COLORS.length] }}
                >
                    {`${startDate} ${startTime} hs - ${endDate} ${endTime} hs`}
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

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <Input
                        form={form}
                        label={language.rows.StartDate}
                        name='startDate'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        form={form}
                        label={language.rows.StartTime}
                        name='startTime'
                        type='time'
                    />
                </div>
            </div>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <Input
                        form={form}
                        label={language.rows.EndDate}
                        name='endDate'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <Input
                        form={form}
                        label={language.rows.EndTime}
                        name='endTime'
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

export default Exception