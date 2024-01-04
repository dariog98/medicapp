import { faMagnifyingGlassPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { ButtonLink, Table, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatients } from '../../hooks'
import { ROUTES } from '../../constants/routes'

const ProfesionalPatients = ({ idProfesional }) => {
    const { language } = useSettingsContext()
    const { isLoading, data, order, handleOrder } = usePatients({ idProfesional })

    return (
        <div>
            <Title icon={faUserGroup} text={language.Patients}>
                <ButtonLink
                    icon={faMagnifyingGlassPlus}
                    className='btn-outline-system'
                    text={language.buttons.SeeMore}
                    to={`${ROUTES.Patients}?idProfesional=${idProfesional}`}
                />
            </Title>

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
            </div>
        </div>
    )
}

export default ProfesionalPatients