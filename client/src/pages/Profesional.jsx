import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { Container, Loading, NotFound, Title } from '../components/basis'
import { useProfesional } from '../hooks'
import { useParams } from 'react-router-dom'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { ProfesionalData, ProfesionalPatients, ProfesionalTreatments } from '../components/profesional'

const Profesional = () => {
    const { language } = useSettingsContext()
    const { id: idProfesional } = useParams()
    const { isLoading, data } = useProfesional({ idProfesional })

    return (
        isLoading ?
            <Loading/>
        : 
            data?.data ?
                <Container>
                    <div className='d-grid gap-3' style={{ gridTemplateColumns: '2fr 1fr' }} >
                        <div className='d-flex flex-column gap-3'>
                            <Title icon={faUserDoctor} text={language.Profesional}/>
                            <ProfesionalData profesional={data.data}/>
                            <ProfesionalTreatments idProfesional={idProfesional}/>
                        </div>
                        <div>
                            <ProfesionalPatients idProfesional={idProfesional}/>
                        </div>
                    </div>
                </Container>
                :
                <NotFound/>
    )
}

export default Profesional