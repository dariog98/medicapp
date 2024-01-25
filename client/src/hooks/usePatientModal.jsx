import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaPatient } from '../constants/schemas'
import { useState } from 'react'
import { MODALMODES } from '../constants/modal'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { TOAST_TIME } from '../constants/time'
import { faPen, faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import patientServices from '../services/patientServices'
import useModal from './useModal'

const usePatientModal = ({ refreshData } = {}) => {
    const { language } = useSettingsContext()
    const { addNotification } = useNotificationsContext()
    const { show: showModal, handleOpen: open, handleClose } = useModal()
    const [modalMode, setModalMode] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({ resolver: yupResolver(schemaPatient) })

    const ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const { surnames, names, dni, birthdate, phone, address } = data
            const patient = { surnames, names, dni, birthdate, phone, address }
            const response = await patientServices.createPatient({ data: patient })
            
            if (response.status === 23505) {
                addNotification({ id: Date.now(), icon: faTriangleExclamation,  message: language.messages.DNIDuplicatedError, type: 'warning', time: TOAST_TIME.Short })
            }
            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.PatientCreated, type: 'primary', time: TOAST_TIME.Short })
                refreshData()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idPatient, surnames, names, dni, birthdate, phone, address } = data
            const patient = { surnames, names, dni, birthdate, phone, address }
            const response = await patientServices.updatePatient({ idPatient, data: patient })

            if (response.status === 23505) {
                addNotification({ id: Date.now(), icon: faTriangleExclamation,  message: language.messages.DNIDuplicatedError, type: 'warning', time: TOAST_TIME.Short })
            }
            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen,  message: language.messages.PatientUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshData()
                handleClose()
            }
        }
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            await ACTIONS[modalMode](data)
        } catch (error) {
            //console.log(error)
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.PatientDeleted, type: 'warning', time: TOAST_TIME.Short })
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpen = (data, mode) => {
        form.reset(data)
        setModalMode(mode ?? MODALMODES.Add)
        open()
    }

    return {
        isLoading,
        showModal,
        modalMode,
        handleOpen,
        handleClose,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) }
    }
}

export default usePatientModal