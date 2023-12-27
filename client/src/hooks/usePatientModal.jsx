import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaPatient } from '../constants/schemas'
import { useState } from 'react'
import useSwitch from './useSwitch'
import { useUserContext } from '../components/providers/UserProvider'
import { RouteAPI } from '../constants/routesAPI'

const usePatientModal = () => {
    const { mode: showModal, onSwitch, offSwitch: handleClose } = useSwitch()
    const form = useForm({ resolver: yupResolver(schemaPatient) })
    const [modalMode, setModalMode] = useState(0)
    const { userToken } = useUserContext()

    const handleConfirm = async (data) => {
        const { surnames, names, dni, birthdate, phone, address } = data
        const patient = { surnames, names, dni, birthdate, phone, address }

        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        }

        const URL = RouteAPI.Patients
        const response = await fetch(URL, config)
        const json = await response.json()
    }

    const handleOpen = (data) => {
        form.reset(data)
        onSwitch()
    }

    return {
        showModal,
        modalMode,
        handleOpen,
        handleClose,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default usePatientModal