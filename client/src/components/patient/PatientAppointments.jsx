import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { AppointmentsList, Loading, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useAppointments } from '../../hooks'

const PatientAppointments = ({ idPatient }) => {
    const { language } = useSettingsContext()
    const { isLoading, data } = useAppointments({ idPatient })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faCalendarWeek} text={language.Appointments}/>
            {
                isLoading ?
                <>
                    <Loading size='small'/>
                </>
                :
                    data &&
                    <AppointmentsList data={data.data}/>
            }
        </div>
    )
}

export default PatientAppointments