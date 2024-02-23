import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Container, NotFound, Title, Loading } from '../components/basis'
import { usePatient } from '../hooks'
import { useParams } from 'react-router-dom'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { PatientAppointments, PatientData, PatientFiles, PatientNotes, PatientPhotos, PatientTreatments } from '../components/patient'

const Patient = () => {
    const { language } = useSettingsContext()
    const { id: idPatient } = useParams()
    const { isLoading, data, refreshData } = usePatient({ idPatient })

    return (
        isLoading ?
            <Loading/>
        : 
            data?.data ?
                <Container>

                    <div className='d-grid gap-3' style={{ gridTemplateColumns: '3fr 2fr' }} >
                        <div className='d-flex flex-column gap-3'>
                            <PatientData data={data.data} refreshData={refreshData}/>
                            <PatientNotes idPatient={idPatient}/>
                            <PatientPhotos idPatient={idPatient}/>
                            <PatientFiles idPatient={idPatient}/>
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            <PatientAppointments idPatient={idPatient}/>
                            <PatientTreatments idPatient={idPatient}/>
                        </div>
                    </div>
                    
                </Container>
                :
                <NotFound/>
    )
}

export default Patient