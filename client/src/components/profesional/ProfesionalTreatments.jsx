import { faPlus, faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { Button, Pagination, SearchBar, Table, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useProfesionalTreatments, useTreatmentModal } from '../../hooks'
import { useState } from 'react'
import TreatmentModal from './TreatmentModal'

const ProfesionalTreatments = ({ idProfesional }) => {
    const { language } = useSettingsContext()
    const [search, setSearch] = useState('')
    const { isLoading, data, order, handleOrder, page, handlePage, refreshTreatments } = useProfesionalTreatments({ search, idProfesional })
    const { showModal, modalMode, handleOpen, handleClose, form, isLoading: isLoadingModal, handleEdit, handleDelete } = useTreatmentModal({ idProfesional, refreshTreatments })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faStethoscope} text={language.headings.Treatments}/>

            <div className='d-flex gap-3'>
                <SearchBar placeholder={`${language.Search}...`} handleSearch={setSearch}/>

                <div>
                    <Button
                        className='btn-primary'
                        icon={faPlus}
                        text={language.buttons.Add}
                        handleOnClick={() => handleOpen()}
                    />
                </div>
            </div>

            <div className='d-flex flex-column align-items-center'>
                <Table
                    isLoading={isLoading}
                    items={data?.data || []}
                    columns={[{ name: language.rows.Description, key: 'description', ordered: true }]}
                    order={order}
                    handleOrder={handleOrder}
                    caption={`Total: ${data?.total ?? 0}`}
                    isPressable={true}
                    handleOnPress={(item) => handleOpen(item)}
                />
                <Pagination page={page} handlePage={handlePage} totalPages={data?.totalPages}/>
            </div>

            <TreatmentModal
                showModal={showModal}
                modalMode={modalMode}
                handleClose={handleClose}
                form={form}
                isLoading={isLoadingModal}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default ProfesionalTreatments