import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

const background = {
    primary: 'text-bg-primary',
    secondary: 'text-bg-secondary',
    success: 'text-bg-success',
    danger: 'text-bg-danger',
    warning: 'text-bg-warning',
    info: 'text-bg-info',
    light: 'text-bg-light',
    dark: 'text-bg-dark',
}

const Notification = ({ data, handleClose }) => {
    const [showing, setShowing] = useState(true)

    useEffect(() => {
        setTimeout(() => setShowing(false), 500)
    }, [])

    return (
        <div className={`toast fade show ${showing ? 'showing' : ''} align-items-center ${background[data.type]}`}>
            <div className='d-flex'>
                <div className='toast-body'>
                    <div className='d-flex gap-2 align-items-center'>
                        {data?.icon && <FontAwesomeIcon icon={data.icon}/>}
                        {data.message}
                    </div>
                </div>
                <button type='button' className={`btn-close me-2 m-auto`} onClick={handleClose}></button>
            </div>
        </div>
    )
}

export default Notification