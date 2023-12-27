import { useState } from 'react'

const useModal = () => {
    const [show, setShow] = useState(false)

    const handleOpen = () => {
        setShow(true)
        document.body.style.overflow = 'hidden'
    }

    const handleClose = () => {
        setShow(false)
        document.body.style.overflow = ''
    }

    return {
        show,
        handleOpen,
        handleClose
    }
}

export default useModal