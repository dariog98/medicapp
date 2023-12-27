import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MODALMODES } from '../../../constants/modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaNotes } from '../../../constants/schemas'
import { useModal } from '../../../hooks'

const useNotesModal = () => {
    const form = useForm({ resolver: yupResolver(schemaNotes) })
    const [isLoading, setIsLoading] = useState(false)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const { show: showModal, handleOpen: open, handleClose } = useModal()

    const handleOpen = (data, mode) => {
        form.reset(data)
        setModalMode(mode ?? MODALMODES.Add)
        open()
    }

    const handleConfirm = async (data) => {
        
    }

    return {
        form: {...form, handleSubmit: form.handleSubmit(handleConfirm) },
        isLoading,
        showModal,
        modalMode,
        handleOpen,
        handleClose
    }
}

export default useNotesModal