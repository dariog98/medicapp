import { faNotesMedical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInLanguageTimeZone } from '../../constants/dateToString'
import { Button, Loading, Pagination, SearchBar, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatientNotes, usePatientNoteModal } from '../../hooks'
import NoteModal from './notes/NoteModal'
import { MODALMODES } from '../../constants/modal'

const Note = ({ data, handleOnClick }) => {
    const { language, timeZone } = useSettingsContext()

    return (
        <div className='w-100 card cursor-pointer' onClick={handleOnClick}>
            <div className='card-header'>
                {getStringDateInLanguageTimeZone(new Date(data.updatedAt), language.string, timeZone)}
            </div>
            <div className='card-body'>
                <div className='text-maxlines-3'>{data.content}</div>
            </div>
        </div>
    )
}

const PatientNotes = ({ idPatient }) => {
    const { language } = useSettingsContext()
    const { isLoading, data, page, handlePage, handleSearch, refreshNotes } = usePatientNotes({ idPatient })
    const { form, showModal, modalMode, handleOpen, handleClose, handleDelete, handleEdit, isLoading: isLoadingModal } = usePatientNoteModal({ idPatient, refreshNotes })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faNotesMedical} text={language.Notes}/>

            <div className='d-flex gap-3'>
                <SearchBar placeholder={`${language.Search}...`} handleSearch={handleSearch}/>

                <div>
                    <Button
                        className='btn-primary'
                        icon={faPlus}
                        text={language.buttons.Add}
                        handleOnClick={() => handleOpen()}
                    />
                </div>
            </div>

            <div className='d-flex flex-column align-items-center gap-3'>
                {
                    isLoading ?
                    <div className='card w-100 p-4'>
                        <Loading size='small'/>
                    </div>
                    :
                    data && data.data.length
                    ? 
                    <>
                        {data.data.map(note => <Note key={note.id} data={note} handleOnClick={() => handleOpen(note, MODALMODES.Preview)}/>)}
                        <Pagination page={page} handlePage={handlePage} totalPages={data?.totalPages}/>
                    </>
                    :
                    <div className='card w-100 d-flex justify-content-center align-items-center p-2'>
                        {language.messages.NoResults}
                    </div>
                }
            </div>

            <NoteModal
                form={form}
                showModal={showModal}
                modalMode={modalMode}
                handleClose={handleClose}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isLoading={isLoadingModal}
            />
        </div>
    )
}

export default PatientNotes