import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Title = ({ icon, text, children }) => {
    return (
        <div className='d-flex'>
            <div className='flex-grow-1 d-flex align-items-center gap-2'>
                {
                    icon &&
                    <FontAwesomeIcon icon={icon} size='2x'/>
                }
                <div className='fs-4 fw-medium'>{text}</div>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}

export default Title