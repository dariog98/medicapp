import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { Title } from '../components/basis'
import ProfesionalData from '../components/profesional/ProfesionalData'
import { useProfesional } from '../hooks'
import { useParams } from 'react-router-dom'
import ProfesionalPatients from '../components/profesional/ProfesionalPatients'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const Profesional = () => {
    const { language } = useSettingsContext()
    const { id: idProfesional } = useParams()
    const { isLoading, data } = useProfesional({ idProfesional })

    console.log({ idProfesional })

    return (
        <div className='w-100 my-4'>
            <div className='container'>
                {
                    data &&
                    <div className='d-grid gap-3' style={{ gridTemplateColumns: '2fr 1fr' }} >
                        <div className='d-flex flex-column gap-3'>
                            <Title icon={faUserDoctor} text={language.Profesional}/>
                            <ProfesionalData profesional={data.data}/>
                        </div>
                        <div>
                            <ProfesionalPatients idProfesional={idProfesional}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profesional