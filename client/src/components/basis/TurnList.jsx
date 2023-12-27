import { useSettingsContext } from '../providers/SettingsProvider'
import TurnItem from './TurnItem'

const TurnsList = ({ data }) => {
    const { language } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>
            {
                data.length
                ? <>
                    {data.map(turn => <TurnItem key={turn.id} data={turn}/>)}
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

export default TurnsList