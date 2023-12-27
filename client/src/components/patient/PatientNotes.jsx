import { faNotesMedical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getStringDateInLanguageTimeZone } from '../../constants/dateToString'
import { Button, Pagination, SearchBar, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { usePatientNotes } from '../../hooks'

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
                    data &&
                    data.lenght
                    ? data.data.map(note => <Note key={note.id} data={note}/>)
                    :
                    <div className='w-100 border rounded d-flex justify-content-center align-items-center p-2'>
                        {language.messages.NoResults}
                    </div>
                }
                <Pagination page={page} handlePage={handlePage} totalPages={data?.totalPages}/>
            </div>
        </div>
    )
}

export default PatientNotes