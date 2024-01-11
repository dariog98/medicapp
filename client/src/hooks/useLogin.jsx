import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLogin } from '../constants/schemas'
import { useUserContext } from '../components/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import userServices from '../services/userServices'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { TOAST_TIME } from '../constants/time'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const useLogin = () => {
    const navigate = useNavigate()
    const { language } = useSettingsContext()
    const { addNotification } = useNotificationsContext()
    const { handleLogIn } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({ resolver: yupResolver(schemaLogin) })

    const ACTIONS = {
        200: (data) => {
            handleLogIn(data)
            navigate(ROUTES.Home)
        },
        404: () => {
            addNotification({
                id: Date.now(),
                icon: faTriangleExclamation,
                message: language.messages.UserNotFound,
                type: 'warning',
                time: TOAST_TIME.Short
            })
        },
        409: () => {
            addNotification({
                id: Date.now(),
                icon: faTriangleExclamation,
                message: language.messages.InvalidPassword,
                type: 'warning',
                time: TOAST_TIME.Short
            })
        },
        default: () => {
            addNotification({
                id: Date.now(),
                icon: faTriangleExclamation,
                message: language.messages.AnErrorOcurred,
                type: 'warning',
                time: TOAST_TIME.Short
            })
        }
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await userServices.login(data)
            ACTIONS[response.status](response.data)
        } catch (error) {
            ACTIONS.default()
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default useLogin