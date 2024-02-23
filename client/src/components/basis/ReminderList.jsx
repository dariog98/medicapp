import { useSettingsContext } from '../providers/SettingsProvider'
import Loading from './Loading'
import ReminderItem from './ReminderItem'

const ReminderList = ({ isLoading, data }) => {
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>
            {
                isLoading ?
                    <div className='card py-4'>
                        <Loading size='small'/>
                    </div>
                :
                    data.length ?
                    <>
                        {data.map(turn => <ReminderItem key={turn.id} data={turn}/>)}
                    </>
                    :
                    <>
                        <div className='card flex-grow-1 d-flex justify-content-center align-items-center p-2'>
                            {language.messages.NoResults}
                        </div>
                    </>
            }
        </div>
    )
}

export default ReminderList