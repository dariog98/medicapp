import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ handleOnClick, isDisabled, icon, text, title, className, style, isActived, isLoading, tabIndex }) => {
    return (
        <button
            className={`btn d-flex justify-content-center align-items-center gap-1 text-truncate ${className} ${isActived ? 'active' : ''}`}
            onClick={handleOnClick}
            title={title}
            disabled={isDisabled}
            style={style}
            tabIndex={tabIndex}
        >
            {icon && <FontAwesomeIcon icon={icon}/>}
            {isLoading && <div className='spinner-border' style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}/>}
            {text}
        </button> 
    )
}

export default Button