import { useUserContext } from '../components/providers/UserProvider'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import useModal from './useModal'

const useUserModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useUserContext()
    const { surnames, names, username, mail, phone, charge: { id: idCharge } } = user
    const form = useForm({ defaultValues: { surnames, names, username, mail, phone, idCharge } })
    const { show, handleClose, handleOpen } = useModal()

    return {
        isLoading,
        form,
        showModal: show,
        handleOpen,
        handleClose
    }
}

export default useUserModal