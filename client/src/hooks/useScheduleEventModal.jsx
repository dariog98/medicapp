import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { MODALMODES, MODALTABS } from '../constants/modal'
import { schemaExceptions, schemaReminders, schemaTurns } from '../constants/schemas'
import useModal from './useModal'
import { getStringDateInTimeZone, getStringTimeInTimeZone } from '../constants/dateToString'
import profesionalServices from '../services/profesionalServices'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { TOAST_TIME } from '../constants/time'

const useScheduleEventModal = ({ idProfesional, refreshEvents } = {}) => {
    const [isLoading, setIsLoading] = useState()
    const [modalTab, setModalTab] = useState(MODALTABS.Turns)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const { show: showModal, handleOpen: open, handleClose } = useModal()

    const turnForm = useForm({ resolver: yupResolver(schemaTurns) })
    const exceptionForm = useForm({ resolver: yupResolver(schemaExceptions) })
    const reminderForm = useForm({ resolver: yupResolver(schemaReminders) })

    const { language, timeZone } = useSettingsContext()
    const { addNotification } = useNotificationsContext()

    const OPEN_ACTIONS = {
        [MODALMODES.Add]: (data = {}) => {
            const { date, time } = data
            turnForm.reset({ date, time })
            exceptionForm.reset({ startDate: date, startTime: time, endDate: date })
            reminderForm.reset({ date, time })
        },
        [MODALTABS.Turns]: (data = {}) => {
            const { id, patient, startTime, duration, treatment, description } = data
            setPatient(patient)
            setTreatment(treatment)
            turnForm.reset({
                id, patient, duration, treatment, description, 
                date: getStringDateInTimeZone(new Date(startTime), timeZone),
                time: getStringTimeInTimeZone(new Date(startTime), timeZone),
            })
        },
        [MODALTABS.Reminders]: (data = {}) => {
            const { id, patient, startTime, description } = data
            setPatient(patient)
            reminderForm.reset({
                id, patient, description,
                date: getStringDateInTimeZone(new Date(startTime), timeZone),
                time: getStringTimeInTimeZone(new Date(startTime), timeZone),
            })
        },
        [MODALTABS.Exceptions]: (data = {}) => {
            const { id, startDateTime, endDateTime, description } = data
            exceptionForm.reset({
                id, description,
                startDate: getStringDateInTimeZone(new Date(startDateTime), timeZone),
                startTime: getStringTimeInTimeZone(new Date(startDateTime), timeZone),
                endDate: getStringDateInTimeZone(new Date(endDateTime), timeZone),
                endTime: getStringTimeInTimeZone(new Date(endDateTime), timeZone),
            })
        }
    }

    const handleOpen = (data, tab = MODALTABS.Turns, mode = MODALMODES.Add) => {
        setModalTab(tab)
        setModalMode(mode)
        if (mode === MODALMODES.Add) {
            OPEN_ACTIONS[MODALMODES.Add](data)
        } else {
            OPEN_ACTIONS[tab](data)
        }
        open()
    }

    const TURN_ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const { patient: { id: idPatient }, duration, description } = data
            const dateTime = `${data.date}T${data.time}:00${timeZone.numeric}`
            const idTreatment = data?.treatment?.id
            const turn = { idPatient, dateTime, duration, idTreatment, description }
            const response = await profesionalServices.createTurn({ idProfesional, data: turn })

            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.TurnCreated, type: 'primary', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idTurn, duration, description } = data
            const dateTime = `${data.date}T${data.time}:00${timeZone.numeric}`
            const idTreatment = data?.treatment?.id
            const turn = { dateTime, duration, idTreatment, description }
            
            const response = await profesionalServices.updateTurn({ idProfesional, idTurn, data: turn })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.TurnUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        },
        [MODALMODES.Delete]: async (data) => {
            const { id: idTurn } = data
            const response = await profesionalServices.deleteTurn({ idProfesional, idTurn })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.TurnDeleted, type: 'danger', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        }
    }

    const handleConfirmTurn = async (data) => {
        try {
            setIsLoading(true)
            await TURN_ACTIONS[modalMode](data)
        } catch (error) {
            //console.log(error)
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.AnErrorOcurred, type: 'warning', time: TOAST_TIME.Short })
        } finally {
            setIsLoading(false)
        }
    }

    const EXCEPTION_ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const { description } = data
            const startDateTime = `${data.startDate}T${data.startTime}:00${timeZone.numeric}`
            const endDateTime = `${data.endDate}T${data.endTime}:00${timeZone.numeric}`
            const exception = { startDateTime, endDateTime, description }
            const response = await profesionalServices.createException({ idProfesional, data: exception })

            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.ExceptionCreated, type: 'primary', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idException, description } = data
            const startDateTime = `${data.startDate}T${data.startTime}:00${timeZone.numeric}`
            const endDateTime = `${data.endDate}T${data.endTime}:00${timeZone.numeric}`
            const exception = { startDateTime, endDateTime, description }
            const response = await profesionalServices.updateException({ idProfesional, idException, data: exception })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.ExceptionUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        },
        [MODALMODES.Delete]: async (data) => {
            const { id: idException } = data
            const response = await profesionalServices.deleteException({ idProfesional, idException })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.ExceptionDeleted, type: 'danger', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        }
    }

    const handleConfirmException = async (data) => {
        try {
            setIsLoading(true)
            await EXCEPTION_ACTIONS[modalMode](data)
        } catch (error) {
            //console.log(error)
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.AnErrorOcurred, type: 'warning', time: TOAST_TIME.Short })
        } finally {
            setIsLoading(false)
        }
    }

    const REMINDER_ACTIONS = {
        [MODALMODES.Add]: async (data) => {
            const { patient: { id: idPatient }, description } = data
            const dateTime = `${data.date}T${data.time}:00${timeZone.numeric}`
            const reminder = { idPatient, dateTime, description }
            const response = await profesionalServices.createReminder({ idProfesional, data: reminder })

            if (response.status === 201) {
                addNotification({ id: Date.now(), icon: faPlus, message: language.messages.ReminderCreated, type: 'primary', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        },
        [MODALMODES.Edit]: async (data) => {
            const { id: idReminder, description } = data
            const dateTime = `${data.date}T${data.time}:00${timeZone.numeric}`
            const reminder = { dateTime, description }
            
            const response = await profesionalServices.updateReminder({ idProfesional, idReminder, data: reminder })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.ReminderUpdated, type: 'success', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        },
        [MODALMODES.Delete]: async (data) => {
            const { id: idReminder } = data
            const response = await profesionalServices.deleteReminder({ idProfesional, idReminder })

            if (response.status === 200) {
                addNotification({ id: Date.now(), icon: faPen, message: language.messages.ReminderDeleted, type: 'danger', time: TOAST_TIME.Short })
                refreshEvents()
                handleClose()
            }
        }
    }

    const handleConfirmReminder = async (data) => {
        try {
            setIsLoading(true)
            await REMINDER_ACTIONS[modalMode](data)
        } catch (error) {
            //console.log(error)
            addNotification({ id: Date.now(), icon: faTriangleExclamation, message: language.messages.AnErrorOcurred, type: 'warning', time: TOAST_TIME.Short })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        showModal,
        handleOpen,
        handleClose,
        modalMode,
        modalTab,
        handleModalTab: setModalTab,
        turnForm: {...turnForm, handleSubmit: turnForm.handleSubmit(handleConfirmTurn) },
        exceptionForm: { ...exceptionForm, handleSubmit: exceptionForm.handleSubmit(handleConfirmException)},
        reminderForm: { ...reminderForm, handleSubmit: reminderForm.handleSubmit(handleConfirmReminder)},
    }
}

export default useScheduleEventModal