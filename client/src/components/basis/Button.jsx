import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const iconStyle = { width: '1.25rem', height: '1.25rem' }

const Button = ({ handleOnClick, isDisabled, icon, text, title, className, style, isActived, isLoading }) => {
    return (
        <button
            className={`btn d-flex justify-content-center align-items-center gap-1 text-truncate ${className} ${isActived ? 'active' : ''}`}
            onClick={handleOnClick}
            title={title}
            disabled={isDisabled}
            style={style}
        >
            {icon && <FontAwesomeIcon icon={icon} size='1x'/>}
            {isLoading && <div className='spinner-border' style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}/>}
            {text}
        </button> 
    )
}

export default Button