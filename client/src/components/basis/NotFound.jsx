import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettingsContext } from '../providers/SettingsProvider'

const NotFound = () => {
    const { language } = useSettingsContext()
    return (
        <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
            <div className='d-flex flex-column gap-1 align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faExclamationTriangle} size='10x'/>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Error 404</h2>
                    <h5>{language.messages.PageNotFound}</h5>
                </div>
            </div>
        </div>
    )
}

export default NotFound