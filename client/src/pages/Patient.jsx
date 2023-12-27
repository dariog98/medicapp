import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Title } from '../components/basis'
import { usePatient } from '../hooks'
import { useParams } from 'react-router-dom'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { PatientData, PatientFiles, PatientNotes, PatientPhotos, PatientTreatments, PatientTurns } from '../components/patient'

const Patient = () => {
    const { language } = useSettingsContext()
    const { id: idPatient } = useParams()
    const { isLoading, data } = usePatient({ idPatient })

    return (
        <div className='w-100 my-4'>
            <div className='container'>
                {
                    data &&
                    <div className='d-grid gap-3' style={{ gridTemplateColumns: '3fr 2fr' }} >
                        <div className='d-flex flex-column gap-3'>
                            <Title icon={faUser} text={language.Patient}/>
                            <PatientData data={data.data}/>
                            <PatientNotes idPatient={idPatient}/>
                            <PatientPhotos idPatient={idPatient}/>
                            <PatientFiles idPatient={idPatient}/>
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            <PatientTurns idPatient={idPatient}/>
                            <PatientTreatments idPatient={idPatient}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Patient