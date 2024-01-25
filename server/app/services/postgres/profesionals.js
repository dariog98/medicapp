import { Op, Sequelize } from 'sequelize'
import { Appointment, Exception, Reminder, Treatment, User } from '../../models/postgres/index.js'
import { paginatedQuery } from '../../utils/paginatedQuery.js'
import { ClientError, ServerError } from '../../constants/errors.js'
import { snakeToCamelObject } from '../../utils/snakeToCamel.js'

const getAllProfesionals = async ({ search, page, order }) => {
    return await paginatedQuery(User, 100, page, order, { id_role: 1 }, [],
    {
        [Op.or]: [
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), { [Op.like]: `%${search ?? ''}%` }),
            { username: { [Op.like]: `%${search ?? ''}%` } }
        ]
    })
}

const getProfesional = async ({ idProfesional }) => {
    const profesional = await User.findByPk(idProfesional, { include: ['role', 'charge'] })
    if (!profesional) throw new ClientError('Profesional not found', 404)
    return profesional
}

const getProfesionalEvents = async ({ idProfesional, startTime, endTime}) => {
    const appointments = await Appointment.findAll({
        where: { id_profesional: idProfesional, date_time: { [Op.between]: [startTime, endTime] } },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient', 'treatment'],
    })

    const exceptions = await Exception.findAll({
        where: { id_profesional: idProfesional, start_date_time: { [Op.lte]: endTime }, end_date_time: { [Op.gte]: startTime } },
        include: ['createdByUser', 'modifiedByUser', 'profesional'],
    })

    const reminders = await Reminder.findAll({
        where: { id_profesional: idProfesional, date_time: { [Op.between]: [startTime, endTime] } },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient'],
    })

    const data = [
        ...appointments.map(t => {
            const appointment = t.get()

            const startTime = new Date(appointment.date_time)
            const [hours, minutes] = appointment.duration.split(':')
            const endTime = new Date(Date.UTC(
                startTime.getUTCFullYear(),
                startTime.getUTCMonth(),
                startTime.getUTCDate(),
                startTime.getUTCHours() + parseInt(hours),
                startTime.getUTCMinutes() + parseInt(minutes)
            ))

            return { type: 'appointment', startTime, endTime, ...appointment }
        }),
        ...exceptions.map(ex => {
            const exception = snakeToCamelObject(ex.get())
            const profesional = snakeToCamelObject(exception.profesional.get())
            return { ...exception, profesional, type: 'exception', startTime: exception.startDateTime, endTime: exception.endDateTime }
        }),
        ...reminders.map(r => {
            const reminder = snakeToCamelObject(r.get())
            const patient = reminder.patient ? snakeToCamelObject(reminder.patient.get()) : undefined
            const profesional = snakeToCamelObject(reminder.profesional.get())
            return { ...reminder, patient, profesional, type: 'reminder', startTime: reminder.dateTime }
        })
    ]

    return data
}

const getProfesionalTreatments = async ({ idProfesional, search, page, order }) => {
    return await paginatedQuery(Treatment, 100, page, order, { id_profesional: idProfesional }, [], {
        description: { [Op.like]: `%${search ?? ''}%` }
    })
}

const getProfesionalTreatment = async ({ idProfesional, idTreatment }) => {
    const treatment = await Treatment.findOne({ where: { id_profesional: idProfesional, id: idTreatment }})
    if (!treatment) throw new ClientError('Treatment is not found or does not exist', 404)
    return treatment
}

const createProfesionalTreatment = async ({ idProfesional, description }) => {
    try {
        return await Treatment.create({ id_profesional: idProfesional, description })
    } catch(error) {
        const errorNumber = Number(error?.original?.code)
        if (errorNumber === 23505) throw new ClientError('Description duplicate', 409, 1062)
        throw new ServerError('An error occurred while trying to create the treatment', 500)
    }
}

const updateProfesionalTreatment = async ({ idProfesional, idTreatment, description}) => {
    const treatment = await Treatment.findOne({ where: { id_profesional: idProfesional, id: idTreatment } })
    if (!treatment) throw new ClientError('Treatment is not found or does not exist', 404)

    try {
        return await treatment.update({ description })
    } catch (error) {
        const errorNumber = Number(error?.original?.code)
        if (errorNumber === 23505) throw new ClientError('Description duplicate', 409, 1062)
        throw new ServerError('An error occurred while trying to update the treatment', 500)
    }
}

const deleteProfesionalTreatment = async ({ idProfesional, idTreatment }) => {
    const treatment = await Treatment.findOne({ where: { id_profesional: idProfesional, id: idTreatment } })
    if (!treatment) throw new ClientError('Treatment is not found or does not exist', 404)

    try {
        return await treatment.destroy()
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1451) throw new ClientError("The treatment can't be deleted since it was assigned to a appointment", 409, 1451)
        throw new ServerError('An error occurred while trying to delete the treatment', 500)
    }
}

const createProfesionalAppointment = async ({ idProfesional, idPatient, dateTime, duration, idTreatment, description, createdBy }) => {
    try {
        return await Appointment.create({
            id_profesional: idProfesional,
            id_patient: idPatient,
            date_time: dateTime,
            id_treatment: idTreatment,
            created_by: createdBy,
            duration,
            description,
        })
    } catch (error) {
        const errorNumber = Number(error?.original?.code)
        if (errorNumber === 23505 || errorNumber === 50001) throw new ClientError('The date time is not avalaible', 409, 23505)
        throw new ServerError('An error occurred while trying to create the appointment', 500)
    }
}

const updateProfesionalAppointment = async ({ idProfesional, idAppointment, dateTime, duration, idTreatment, description, modifiedBy }) => {
    const appointment = await Appointment.findOne({ where: { id_profesional: idProfesional, id: idAppointment } })
    if (!appointment) throw new ClientError('Appointment was not found or does not exist', 404)

    try {
        return await appointment.update({ date_time: dateTime, duration, id_treatment: idTreatment ?? null, description, modified_by: modifiedBy })
    } catch (error) {
        const errorNumber = Number(error?.original?.code)
        if (errorNumber === 23505 || errorNumber === 50001) throw new ClientError('The date time is not avalaible', 409, 23505)
        throw new ServerError('An error occurred while trying to update the appointment', 500)
    }
}

const deleteProfesionalAppointment = async ({ idProfesional, idAppointment }) => {
    const appointment = await Appointment.findOne({ where: { id_profesional: idProfesional, id: idAppointment } })
    if (!appointment) throw new ClientError('Appointment was not found or does not exist', 404)

    try {
        return await appointment.destroy()
    } catch (error) {
        throw new ServerError('An error occurred while trying to delete the appointment', 500)
    }
}

const createProfesionalException = async ({ idProfesional, startDateTime, endDateTime, description, createdBy}) => {
    try {
        return await Exception.create({ 
            id_profesional: idProfesional,
            start_date_time: startDateTime,
            end_date_time: endDateTime,
            created_by: createdBy,
            description,
        })
    } catch (error) {
        console.log(error)
        throw new ServerError('An error occurred while trying to create the excepion', 500)
    }
}

const updateProfesionalException = async ({ idProfesional, idException, startDateTime, endDateTime, description, modifiedBy }) => {
    const exception = await Exception.findOne({ where: { id_profesional: idProfesional, id: idException } })
    if (!exception) throw new ClientError('Exception was not found or does not exist', 404)

    try {
        return await exception.update({ start_date_time: startDateTime, end_date_time: endDateTime, description, modified_by: modifiedBy })
    } catch (error) {
        throw new ServerError('An error occurred while trying to update the exception', 500)
    }
}

const deleteProfesionalException = async ({ idProfesional, idException }) => {
    const exception = await Exception.findOne({ where: { id_profesional: idProfesional, id: idException } })
    if (!exception) throw new ClientError('Exception was not found or does not exist', 404)

    try {
        return await exception.destroy()
    } catch (error) {
        throw new ServerError('An error occurred while trying to delete the exception', 500)
    }
}

const createProfesionalReminder = async ({ idProfesional, idPatient, dateTime, description, createdBy }) => {
    try {
        await Reminder.create({
            id_profesional: idProfesional,
            id_patient: idPatient,
            date_time: dateTime,
            created_by: createdBy,
            description,
        })
    } catch (error) {
        console.log(error)
        throw new ServerError('An error occurred while trying to create the reminder', 500)
    }
}

const updateProfesionalReminder = async ({ idProfesional, idReminder, dateTime, description, modifiedBy }) => {
    const reminder = await Reminder.findOne({ where: { id_profesional: idProfesional, id: idReminder } })
    if (!reminder) throw new ClientError('Reminder was not found or does not exist', 404)

    try {
        return await reminder.update({ date_time: dateTime, description, modified_by: modifiedBy })
    } catch(error) {
        throw new ServerError('An error occurred while trying to update the reminder', 500)
    }
}

const deleteProfesionalReminder = async ({ idProfesional, idReminder}) => {
    const reminder = await Reminder.findOne({ where: { id_profesional: idProfesional, id: idReminder } })
    if (!reminder) throw new ClientError('Reminder was not found or does not exist', 404)

    try {
        handleResponse({ response, statusCode: 200, message: 'Reminder deleted successfully' })
    } catch(error) {
        throw new ServerError('An error occurred while trying to delete the reminder', 500)
    }
}


const profesionalsService = {
    getAllProfesionals,
    getProfesional,
    getProfesionalEvents,
    getProfesionalTreatments,
    getProfesionalTreatment,
    createProfesionalTreatment,
    updateProfesionalTreatment,
    deleteProfesionalTreatment,
    createProfesionalAppointment,
    updateProfesionalAppointment,
    deleteProfesionalAppointment,
    createProfesionalException,
    updateProfesionalException,
    deleteProfesionalException,
    createProfesionalReminder,
    updateProfesionalReminder,
    deleteProfesionalReminder,
}

export default profesionalsService