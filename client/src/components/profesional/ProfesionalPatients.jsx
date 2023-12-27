import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { Pagination, Table, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatients } from '../../hooks'

const ProfesionalPatients = ({ idProfesional }) => {
    const { language } = useSettingsContext()
    const { isLoading, data, order, handleOrder, page, handlePage } = usePatients({ idProfesional })

    return (
        <div>
            <Title icon={faUsers} text={language.Patients}/>

            <div className='d-flex flex-column align-items-center gap-3'>
                <Table
                    isLoading={isLoading}
                    items={data ? data.data : []}
                    columns={[
                        { name: language.rows.Surnames, key: 'surnames', ordered: true },
                        { name: language.rows.Names, key: 'names', ordered: true },
                        { name: 'DNI', key: 'dni', ordered: true },
                    ]}
                    order={order}
                    handleOrder={handleOrder}
                    caption={`Total: ${data?.total}`}
                />

                <Pagination page={page} totalPages={data?.totalPages} handlePage={handlePage}/>
            </div>

        </div>
    )
}

export default ProfesionalPatients