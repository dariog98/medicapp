import { faBars, faImage, faTableCellsLarge, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, ImagesViewer, Pagination, SearchBar, Table, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatientPhotos, useSwitch } from '../../hooks'
import { getStringDateTimeInLanguageTimeZone } from '../../constants/dateToString'

const PatientPhotos = ({ idPatient }) => {
    const { language, timeZone } = useSettingsContext()
    const { isLoading, data, order, handleOrder, page, handlePage, handleSearch } = usePatientPhotos({ idPatient })
    const { mode, onSwitch, offSwitch } = useSwitch()

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faImage} text={language.Photos}/>

            <div className='d-flex flex-column gap-3'>
                <div className='d-flex gap-3'>
                    <SearchBar placeholder={`${language.Search}...`} handleSearch={handleSearch}/>

                    <div className='d-flex'>
                        <Button
                            className='btn-outline-system rounded-0 border-end-0 rounded-start'
                            icon={faBars}
                            isActived={!mode}
                            handleOnClick={offSwitch}
                        />

                        <Button
                            className='btn-outline-system rounded-0 border-start-0 rounded-end'
                            icon={faTableCellsLarge}
                            isActived={mode}
                            handleOnClick={onSwitch}
                        />
                    </div>

                    <div>
                        <Button
                            className='btn-primary'
                            icon={faPlus}
                            text={language.buttons.Add}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center gap-3'>
                    {
                        !mode ?
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
                        :
                        <ImagesViewer
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
                            height='646px'
                        />
                    }
                    
                    <Pagination page={page} totalPages={data?.totalPages} handlePage={handlePage}/>
                </div>
            </div>
        </div>
    )
}

export default PatientPhotos