import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInTimeZone } from '../../constants/dateToString'
import { getWeeksInMonth, isTheSameDate } from '../../constants/schedule'
import { UTC } from '../../constants/time'
import { useDate } from '../../hooks'
import { Button } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

//style={{ height: '298px', minWidth: '350px' }}

const buttonStyle = { width: '2.5rem', height: '2.5rem' }

const Calendar = ({ currentDate, handleDate }) => {
    const { language, timeZone } = useSettingsContext()
    const { date, goToPrevMonth, goToNextMonth } = useDate(getStringDateInTimeZone(currentDate, UTC))

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center m-2'>
                <h4>{date.toLocaleString(language.string, { year: 'numeric', month: 'long', timeZone: UTC.string })}</h4>

                <div className='d-flex gap-2'>
                    <Button
                        className='btn-outline-system rounded-circle'
                        style={buttonStyle}
                        icon={faArrowLeft}
                        handleOnClick={goToPrevMonth}
                    />
                    <Button
                        className='btn-outline-system rounded-circle'
                        style={buttonStyle}
                        icon={faArrowRight}
                        handleOnClick={goToNextMonth}
                    />
                </div>
            </div>

            <div className='card p-2' style={{ height: '346px' }}>
                <div className='d-flex flex-column gap-2'>
                <div className='d-flex gap-2'>
                    {language.days.map((day, index)=> <div key={index} className='d-flex justify-content-center align-items-center' style={buttonStyle}>{day.charAt(0)}</div>)}
                </div>
                {
                    getWeeksInMonth(date.getUTCFullYear(), date.getUTCMonth(), timeZone).map((week, weekIndex) => 
                        <div className='d-flex gap-2' key={weekIndex}>
                            {
                                week.map((dateMonth, dayIndex) => {
                                    const isActived = isTheSameDate(dateMonth, currentDate)
                                    return (
                                        <Button
                                            key={dayIndex}
                                            className={`${isActived ? 'btn-primary' :'btn-outline-system'} rounded-circle border-0 ${date.getUTCMonth() !== dateMonth.getUTCMonth() && 'text-secondary' }`}
                                            text={dateMonth.getUTCDate()}
                                            handleOnClick={() => handleDate(getStringDateInTimeZone(dateMonth, UTC))}
                                            style={buttonStyle}
                                            isActived={isActived}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )

}

export default Calendar