import { faUserDoctor, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Pagination, SearchBar, Table, Title } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useProfesionals } from '../hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const Profesionals = () => {
    const { language } = useSettingsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')
    const { isLoading, data, order, handleOrder, page, handlePage } = useProfesionals({ search })
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
                
                <Title icon={faUserDoctor} text={language.Profesionals}/>
                
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
                            { name: language.rows.Username, key: 'username', ordered: true },
                            { name: language.rows.Mail, key:'mail', ordered: true },
                            { name: language.rows.Phone, key:'phone', ordered: true }
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={true}
                        handleOnPress={(item) => navigate(`${ROUTES.Profesionals}/${item.id}`)}
                        caption={`Total: ${data?.total}`}
                    />

                    <Pagination page={page} totalPages={data?.totalPages} handlePage={handlePage}/>
                </div>
            </div>
        </Container>
    )
}

export default Profesionals