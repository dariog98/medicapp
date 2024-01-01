import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotificationsContext } from '../components/providers/NotificationsProvider'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { MODALMODES, MODALTABS } from '../constants/modal'
import { schemaExceptions, schemaReminders, schemaTurns } from '../constants/schemas'
import useModal from './useModal'
import { getStringDateInTimeZone, getStringTimeInTimeZone } from '../constants/dateToString'

const useScheduleEventModal = ({ idProfesional } = {}) => {
    const [isLoading, setIsLoading] = useState()
    const [modalTab, setModalTab] = useState(MODALTABS.Turns)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const { show: showModal, handleOpen: open, handleClose } = useModal()

    const turnForm = useForm({ resolver: yupResolver(schemaTurns) })
    const exceptionForm = useForm({ resolver: yupResolver(schemaExceptions) })
    const reminderForm = useForm({ resolver: yupResolver(schemaReminders) })
    const [patient, setPatient] = useState()
    const [treatment, setTreatment] = useState()

    const { timeZone } = useSettingsContext()
    const { addNotification } = useNotificationsContext()

    console.log('rendering...')

    const OPEN_ACTIONS = {
        [MODALMODES.Add]: (data = {}) => {
            const { date, time } = data
            setPatient(undefined)
            setTreatment(undefined)
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
        if (mode === MODALMODES.Add) {
            OPEN_ACTIONS[MODALMODES.Add](data)
        } else {
            OPEN_ACTIONS[tab](data)
        }
        open()
    }

    const handleConfirmTurn = async (data) => {

    }

    const handleConfirmException = async (data) => {

    }

    const handleConfirmReminder = async (data) => {

    }

    return {
        isLoading,
        showModal,
        handleOpen,
        handleClose,
        modalMode,
        modalTab,
        handleModalTab: setModalTab,
        turnForm: {...turnForm, patient, setPatient, treatment, setTreatment, handleSubmit: turnForm.handleSubmit(handleConfirmTurn) },
        exceptionForm: { ...exceptionForm, handleSubmit: exceptionForm.handleSubmit(handleConfirmException)},
        reminderForm: { ...reminderForm, patient, setPatient, handleSubmit: reminderForm.handleSubmit(handleConfirmReminder)},
    }
}

export default useScheduleEventModal