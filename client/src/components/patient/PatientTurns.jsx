import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { Title, TurnList } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useTurns } from '../../hooks'
import Loading from '../basis/Loading'

const PatientTurns = ({ idPatient }) => {
    const { language } = useSettingsContext()
    const { isLoading, data } = useTurns({ idPatient })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faCalendarWeek} text={language.Turns}/>
            {
                isLoading ?
                <>
                    <Loading size='small'/>
                </>
                :
                    data &&
                    <TurnList data={data.data}/>
            }
        </div>
    )
}

export default PatientTurns