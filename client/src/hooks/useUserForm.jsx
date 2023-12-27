import { useUserContext } from '../components/providers/UserProvider'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const useUserForm = () => {
    const { user } = useUserContext()

    const { surnames, names, username, mail, phone } = user
    const { id: charge } = user.charge
    const { description: role } = user.role
    const form = useForm({ defaultValues: { surnames, names, username, mail, phone, charge, role } })

    const [isLoading, setIsLoading] = useState(false)

    return {
        isLoading,
        form
    }
}

export default useUserForm