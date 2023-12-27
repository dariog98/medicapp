import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'

const Modal= ({ title, children, show, handleClose, contentStyle, modalSize }) => {
    if (show) {
        return (
            <>
                <div className='fade modal-backdrop show'/>

                <div className='fade modal show d-block' tabIndex='-1'>
                    <div className={`modal-dialog modal-dialog-centered ${modalSize}`}>

                        <div className='modal-content' style={contentStyle}>
                            <div className='modal-body'>

                                <div className='mb-3 d-flex align-items-center justify-content-between'>
                                    <h4>{title}</h4>
                                    <Button
                                        className='btn-outline-system rounded-circle'
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                        icon={faX}
                                        handleOnClick={handleClose}
                                    />
                                </div>

                                <div>{children}</div>

                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Modal