import { useSettingsContext } from '../providers/SettingsProvider'
import ReminderItem from './ReminderItem'

const ReminderList = ({ data }) => {
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>
            {
                data.length
                ? <>
                    {data.map(turn => <ReminderItem key={turn.id} data={turn}/>)}
                </>
                : <>
                    <div className='flex-grow-1 d-flex justify-content-center align-items-center border rounded-2 p-2'>
                        {language.messages.NoResults}
                    </div>
                </>
            }
        </div>
    )
}

export default ReminderList