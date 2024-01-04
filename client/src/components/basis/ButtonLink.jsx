import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const ButtonLink = ({ to, icon, text, className, style }) => {
    return (
        <Link
            className={`btn d-flex justify-content-center align-items-center gap-1 text-truncate ${className}`}
            to={to}
            style={style}
        >
            {icon && <FontAwesomeIcon icon={icon}/>}
            {text}
        </Link>
    )
}

export default ButtonLink