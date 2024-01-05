import { faPen, faPlus, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MODALMODES } from '../constants/modal'
import { schemaNote } from '../constants/schemas'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { TOAST_TIME } from '../constants/time'
import patientServices from '../services/patientServices'
import useModal from './useModal'

const useNotesModal = ({ idPatient, refreshNotes } = {}) => {
    const { language } = useSettingsContext()
    const { addNotification } = useNotificationsContext()
    const form = useForm({ resolver: yupResolver(schemaNote) })
    const [isLoading, setIsLoading] = useState(false)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const { show: showModal, handleOpen: open, handleClose } = useModal()

    const handleOpen = (data, mode) => {
        form.reset(data ?? { content: '' })
        setModalMode(mode ?? MODALMODES.Add)
        open()
    }

    const ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const { content } = data
            const response = await patientServices.createNote({ idPatient, data: { content } })

            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.NoteCreated, type: 'primary', time: TOAST_TIME.Short })
                refreshNotes()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idNote, content } = data
            const response = await patientServices.updateNote({ idPatient, idNote, data: { content } })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.NoteUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshNotes()
                handleClose()
            }
        },
        [MODALMODES.Delete]: async (data) => {
            const { id: idNote } = data
            const response = await patientServices.deleteNote({ idPatient, idNote })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faTrashCan, message: language.messages.NoteDeleted, type: 'danger', time: TOAST_TIME.Short })
                refreshNotes()
                handleClose()
            }
        },
    }

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            await ACTIONS[modalMode](data)
        } catch (error) {
            //console.log(error)
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.NoteDeleted, type: 'warning', time: TOAST_TIME.Short })
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

export default useNotesModal