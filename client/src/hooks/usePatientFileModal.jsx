import { faPen, faPlus, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MODALMODES } from '../constants/modal'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { TOAST_TIME } from '../constants/time'
import patientServices from '../services/patientServices'
import useModal from './useModal'

const usePatientFileModal = ({ idPatient, refreshPhotos } = {}) => {
    const { language } = useSettingsContext()
    const { addNotification } = useNotificationsContext()
    const [isLoading, setIsLoading] = useState(false)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const { show: showModal, handleOpen: open, handleClose } = useModal()
    const form = useForm()

    const handleOpen = (data, mode) => {
        form.reset(data ?? { id: '', file: '', name: '', description: '' })
        setModalMode(mode ?? MODALMODES.Add)
        open()
    }

    const ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const file = new FormData()
            file.set('file', data.file[0])
            file.set('name', data.file[0].name)
            file.set('description', data.description)

            const response = await patientServices.createPhoto({ idPatient, data: file })

            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.NoteUpdated, type: 'primary', time: TOAST_TIME.Short })
                refreshPhotos()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idPhoto } = data
            const file = data.file ? data.file[0] : undefined
            const fileData = new FormData()
            fileData.set('file', file)
            fileData.set('name', file?.name ?? data.name)
            fileData.set('description', data.description)

            const response = await patientServices.updatePhoto({ idPatient, idPhoto, data: fileData })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.NoteUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshPhotos()
                handleClose()
            }
        },
        [MODALMODES.Delete]: async (data) => {
            const { id: idPhoto } = data
            const response = await patientServices.deletePhoto({ idPatient, idPhoto })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faTrashCan, message: language.messages.NoteDeleted, type: 'danger', time: TOAST_TIME.Short })
                refreshPhotos()
                handleClose()
            }
        },
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            await ACTIONS[modalMode](data)
        } catch (error) {
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.AnErrorOcurred, type: 'warning', time: TOAST_TIME.Short })
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = () => {
        setModalMode(MODALMODES.Edit)
    }

    const handleDelete = () => {
        setModalMode(MODALMODES.Delete)
    }

    return {
        form: {...form, handleSubmit: form.handleSubmit(handleConfirm) },
        isLoading,
        showModal,
        modalMode,
        handleOpen,
        handleClose,
        handleEdit,
        handleDelete
    }
}

export default usePatientFileModal