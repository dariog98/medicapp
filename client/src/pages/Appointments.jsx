import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AutoComplete, Container, Loading, Title, TurnList } from '../components/basis'
import { usePatients, useProfesionalTreatments, useProfesionals, useTurns } from '../hooks'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const Appointments = () => {
    const { language } = useSettingsContext()

    const [searchParams, setSearchParams] = useSearchParams()
    const idPatient = searchParams.get('idPatient')
    const idProfesional = searchParams.get('idProfesional')
    const idTreatment = searchParams.get('idTreatment')

    const [searchPatient, setSearchPatient] = useState('')
    const [searchProfesional, setSearchProfesional] = useState('')
    const [searchTreatment, setSearchTreatment] = useState('')

    const { isLoading: isLoadingPatients, data: dataPatients } = usePatients({ search: searchPatient })
    const { isLoading: isLoadingProfesionals, data: dataProfesionals } = useProfesionals({ search: searchProfesional })
    const { isLoading: isLoadingTreatments, data: dataTreatments } = useProfesionalTreatments({ search: searchTreatment, idProfesional })

    const { isLoading, data } = useTurns({ idPatient, idProfesional, idTreatment })

    const handleSearchPatient = (patient) => {
        setSearchParams(params => {
            patient ? params.set('idPatient', patient.id) : params.delete('idPatient')
            return params
        })
    }

    const handleSearchProfesional = (profesional) => {
        setSearchParams(params => {
            profesional ? params.set('idProfesional', profesional.id) : params.delete('idProfesional')
            return params
        })
    }

    const handleSearchTreatment = (treatment) => {
        setSearchParams(params => {
            treatment ? params.set('idTreatment', treatment.id) : params.delete('idTreatment')
            return params
        })
    }

    return (
        <Container>
            <div className='d-flex flex-column gap-3'>
                <Title icon={faCalendarWeek} text={language.Turns}/>

                <div className='d-flex gap-3'>
                    <div className='flex-grow-1'>
                        <AutoComplete
                            label={language.Patient}
                            before={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                            isLoading={isLoadingPatients}
                            items={dataPatients?.data || []}
                            value={(item) => `${item.surnames} ${item.names}`}
                            handleSearch={setSearchPatient}
                            handleOnChange={handleSearchPatient}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        <AutoComplete
                            label={language.Profesional}
                            before={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                            isLoading={isLoadingProfesionals}
                            items={dataProfesionals?.data || []}
                            value={(item) => `${item.surnames} ${item.names}`}
                            handleSearch={setSearchProfesional}
                            handleOnChange={handleSearchProfesional}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        <AutoComplete
                            label={language.headings.Treatment}
                            before={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                            isLoading={isLoadingTreatments}
                            items={dataTreatments?.data || []}
                            value={(item) => item.description}
                            handleSearch={setSearchTreatment}
                            handleOnChange={handleSearchTreatment}
                        />
                    </div>
                </div>

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
        </Container>
    )
}

export default Appointments