import { useState } from 'react'
import useModal from './useModal'

const useEventPreviewModal = () => {
    const [data, setData] = useState()
    const { show: showModal, handleOpen: open, handleClose } = useModal()

    const handleOpen = (data) => {
        setData(data)
        open()
    }

    return {
        data,
        showModal,
        handleClose,
        handleOpen,
        handleClose,
    }
}

export default useEventPreviewModal