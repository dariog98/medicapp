import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLogin } from '../constants/schemas'
import { useUserContext } from '../components/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import userServices from '../services/userServices'

const useLogin = () => {
    const form = useForm({ resolver: yupResolver(schemaLogin) })
    const [isLoading, setIsLoading] = useState(false)
    const { handleLogIn } = useUserContext()
    const navigate = useNavigate()

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await userServices.login(data)
            if (response.status === 200) {
                handleLogIn(response.data)
                navigate(ROUTES.Home)
            }
        } catch (error) {
            console.log(error)
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