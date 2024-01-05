import { useSettingsContext } from '../providers/SettingsProvider'
import Loading from './Loading'
import TurnItem from './TurnItem'

const TurnsList = ({ isLoading, data }) => {
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
                        {data.map(turn => <TurnItem key={turn.id} data={turn}/>)}
                    </>
                    :
                    <>
                        <div className='flex-grow-1 d-flex justify-content-center align-items-center border rounded-2 p-2'>
                            {language.messages.NoResults}
                        </div>
                    </>
            }
        </div>
    )
}

export default TurnsList