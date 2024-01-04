import { faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchBar, Title, Button, Table, Pagination, Container } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { usePatientModal, usePatients } from '../hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { getStringDateInLanguageTimeZone } from '../constants/dateToString'
import { UTC } from '../constants/time'
import { PatientModal } from '../components/patient'

const Patients = () => {
    const { language } = useSettingsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')
    const idProfesional = searchParams.get('idProfesional')
    const idTreatment = searchParams.get('idTreatment')
    const { isLoading, data, order, handleOrder, page, handlePage, refreshData } = usePatients({ idProfesional, idTreatment, search })
    const { showModal, form, handleOpen, handleClose } = usePatientModal({ refreshData })
    const navigate = useNavigate()

    const handleSearch = (value) => {
        setSearchParams(params => {
            params.set('search', value)
            return params
        })
    }

    return (
        <Container>
            <div className='d-flex flex-column gap-3'>
                
                <Title icon={faUserGroup} text={language.Patients}/>
                
                <div className='d-flex gap-3'>
                    <SearchBar placeholder={`${language.Search}...`} handleSearch={handleSearch} value={search}/>
                    <div>
                        <Button
                            className='btn-primary'
                            icon={faUserPlus}
                            text={language.buttons.Add}
                            handleOnClick={() => handleOpen()}
                        />
                    </div>
                </div>

                <div className='d-flex flex-column align-items-center gap-3'>
                    <Table
                        isLoading={isLoading}
                        items={data ? data.data : []}
                        columns={[
                            { name: language.rows.Surnames, key: 'surnames', ordered: true },
                            { name: language.rows.Names, key: 'names', ordered: true },
                            { name: 'DNI', key: 'dni', ordered: true },
                            {
                                name: language.rows.Birthdate,
                                key:'birthdate',
                                value: (data) => (getStringDateInLanguageTimeZone(new Date(data), language.string, UTC)),
                                ordered: true
                            },
                            { name: language.rows.Phone, key:'phone', ordered: true }
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={true}
                        handleOnPress={(item) => navigate(`${ROUTES.Patients}/${item.id}`)}
                        caption={`Total: ${data?.total}`}
                    />
                    
                    <Pagination page={page} totalPages={data?.totalPages} handlePage={handlePage}/>

                    <PatientModal form={form} showModal={showModal} handleClose={handleClose}/>
                </div>

            </div>
        </Container>
    )
}

export default Patients