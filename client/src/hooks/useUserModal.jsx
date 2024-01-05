import { useUserContext } from '../components/providers/UserProvider'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { TOAST_TIME } from '../constants/time'
import useModal from './useModal'
import userServices from '../services/userServices'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const useUserModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { user, handleLogIn } = useUserContext()
    const { language } = useSettingsContext()
    const { surnames, names, username, mail, phone, charge: { id: idCharge } } = user
    const { show, handleClose, handleOpen } = useModal()
    const { addNotification } = useNotificationsContext()
    const form = useForm({ defaultValues: { surnames, names, username, mail, phone, idCharge } })

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await userServices.update(data)

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.UserUpdated, type: 'success', time: TOAST_TIME.Short })
                handleLogIn(response.data)
                handleClose()
            }
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) },
        showModal: show,
        handleOpen,
        handleClose
    }
}

export default useUserModal