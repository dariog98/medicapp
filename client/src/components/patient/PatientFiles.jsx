import { faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Pagination, SearchBar, Table, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatientFiles } from '../../hooks'
import { getStringDateTimeInLanguageTimeZone } from '../../constants/dateToString'

const PatientFiles = ({ idPatient }) => {
    const { language, timeZone } = useSettingsContext()
    const { isLoading, data, order, handleOrder, page, handlePage, handleSearch } = usePatientFiles({ idPatient })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faFileLines} text={language.Files}/>

            <div className='d-flex flex-column gap-3'>
                <div className='d-flex gap-3'>
                    <SearchBar placeholder={`${language.Search}...`} handleSearch={handleSearch}/>

                    <div>
                        <Button
                            className='btn-primary'
                            icon={faPlus}
                            text={language.buttons.Add}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <Table
                        isLoading={isLoading}
                        items={data ? data.data : []}
                        columns={[
                            { name: language.rows.Filename, key: 'name', ordered: true },
                            { name: language.rows.Description, key: 'description', ordered: true },
                            {
                                name: language.rows.UpdatedAt,
                                key: 'updatedAt',
                                ordered: true,
                                value: (data) => (getStringDateTimeInLanguageTimeZone(new Date(data), language.string, timeZone)),
                            },
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        caption={`Total: ${data?.total}`}
                    />
                
                    <Pagination page={page} totalPages={data?.totalPages} handlePage={handlePage}/>
                </div>
            </div>
        </div>
    )
}

export default PatientFiles