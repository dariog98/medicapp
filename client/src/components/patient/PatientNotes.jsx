import { faNotesMedical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInLanguageTimeZone } from '../../constants/dateToString'
import { Button, Pagination, SearchBar, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatientNotes } from '../../hooks'
import Loading from '../basis/Loading'
import NotePreview from './notes/NotePreview'
import useNotesModal from './notes/useNoteModal'

const Note = ({ data, handleOnClick }) => {
    const { language, timeZone } = useSettingsContext()

    return (
        <div className='card cursor-pointer' onClick={handleOnClick}>
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
    const { isLoading, data, order, handleOrder, page, handlePage, handleSearch } = usePatientNotes({ idPatient })
    const { form, showModal, handleOpen, handleClose } = useNotesModal()

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
                        {data.data.map(note => <Note key={note.id} data={note} handleOnClick={() => handleOpen(note)}/>)}
                        <Pagination page={page} handlePage={handlePage} totalPages={data?.totalPages}/>
                    </>
                    :
                    <div className='w-100 border rounded d-flex justify-content-center align-items-center p-2'>
                        {language.messages.NoResults}
                    </div>
                }
            </div>

            <NotePreview form={form} showModal={showModal} handleClose={handleClose}/>
        </div>
    )
}

export default PatientNotes