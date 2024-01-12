import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { Loading, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatientTreatments } from '../../hooks'

const PatientTreatments = ({ idPatient }) => {
    const { language } = useSettingsContext()
    const { isLoading, data } = usePatientTreatments({ idPatient })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faStethoscope} text={language.headings.Treatments}/>

            <div>
                {
                    isLoading ?
                    <>
                        <Loading size='small'/>
                    </>
                    :
                        data && data.data?.length ?
                        <div className='d-flex flex-column gap-3'>
                            {
                                data.data.map(treatment =>
                                    <div key={treatment.id} className='card py-2 px-4 d-flex flex-column'>
                                        {treatment.description}
                                        <strong>{`${treatment.profesional.surnames} ${treatment.profesional.names}`}</strong>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div className='w-100 border rounded d-flex justify-content-center align-items-center p-2'>
                            {language.messages.NoResults}
                        </div>
                }
            </div>
        </div>
    )
}

export default PatientTreatments