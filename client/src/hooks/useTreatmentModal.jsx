import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaTreatment } from '../constants/schemas'
import { MODALMODES } from '../constants/modal'
import { TOAST_TIME } from '../constants/time'
import { faPen, faPlus, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import useModal from './useModal'
import profesionalServices from '../services/profesionalServices'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const useTreatmentModal = ({ idProfesional, refreshTreatments } = {}) => {
    const { language } = useSettingsContext()
    const { addNotification } = useNotificationsContext()
    const { show: showModal, handleOpen: open, handleClose } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const form = useForm({ resolver: yupResolver(schemaTreatment) })

    const ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const response = await profesionalServices.createTreatment({ idProfesional, data })
            if (response.status === 1062) {
                addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.DescriptionDuplicatedError, type: 'warning', time: TOAST_TIME.Short })
            }
            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.TreatmentCreated, type: 'primary', time: TOAST_TIME.Short })
                refreshTreatments()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idTreatment, description } = data
            const response = await profesionalServices.updateTreatment({ idProfesional, idTreatment, data: { description } })
            if (response.status === 1062) {
                addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.DescriptionDuplicatedError, type: 'warning', time: TOAST_TIME.Short })
            }
            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.TreatmentUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshTreatments()
                handleClose()
            }
        },
        [MODALMODES.Delete]: async (data) => {
            const { id: idTreatment } = data
            const response = await profesionalServices.deleteTreatment({ idProfesional, idTreatment })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faTrashCan, message: language.messages.TreatmentDeleted, type: 'danger', time: TOAST_TIME.Short })
                refreshTreatments()
                handleClose()
            }
        },
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            await ACTIONS[modalMode](data)
        } catch (error) {
            console.log(error)
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.AnErrorOcurred, type: 'warning', time: TOAST_TIME.Short })
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpen = (data) => {
        form.reset(data ?? { description: '' })
        setModalMode(data ? MODALMODES.Preview : MODALMODES.Add)
        open()
    }

    const handleEdit = () => {
        setModalMode(MODALMODES.Edit)
    }

    const handleDelete = () => {
        setModalMode(MODALMODES.Delete)
    }

    return {
        showModal,
        modalMode,
        handleOpen,
        handleClose,
        isLoading,
        form: { ...form, handleSubmit: form.handleSubmit(handleConfirm) },
        handleEdit,
        handleDelete,
    }
}

export default useTreatmentModal