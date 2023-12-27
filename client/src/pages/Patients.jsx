import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchBar, Title, Button, Table, Pagination } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { usePatients } from '../hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { getStringDateInLanguageTimeZone } from '../constants/dateToString'
import { UTC } from '../constants/time'

const Patients = () => {
    const { language } = useSettingsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')
    const { isLoading, data, order, handleOrder, page, handlePage } = usePatients({})
    const navigate = useNavigate()

    const handleSearch = (value) => {
        setSearchParams(params => {
            params.set('search', value)
            return params
        })
    }

    return (
        <>
            <div className='w-100 my-4'>
                <div className='container'>
                    <div className='d-flex flex-column gap-3'>
                        
                        <Title icon={faUser} text={language.Patients}/>
                        
                        <div className='d-flex gap-3'>
                            <SearchBar placeholder={`${language.Search}...`} handleSearch={handleSearch} value={search}/>
                            <div>
                                <Button
                                    className='btn-primary'
                                    icon={faUserPlus}
                                    text={language.buttons.Add}
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
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Patients