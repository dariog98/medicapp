import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUserPassword } from '../constants/schemas'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import useModal from './useModal'
import userServices from '../services/userServices'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { TOAST_TIME } from '../constants/time'

const useChangePasswordModal = () => {
    const { language } = useSettingsContext()
    const [isLoading, setIsLoading] = useState(false)
    const { show, handleOpen, handleClose } = useModal()
    const form = useForm({ resolver: yupResolver(schemaUserPassword) })
    const { addNotification } = useNotificationsContext()

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await userServices.changePassword(data)

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faKey, message: language.messages.PasswordChanged, type: 'success', time: TOAST_TIME.Short })
                handleClose()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        showModal: show,
        handleOpen,
        handleClose,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useChangePasswordModal