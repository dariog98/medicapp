import * as yup from 'yup'
import { LANGUAGES } from './languages'

const currentLanguage = JSON.parse(window.localStorage.getItem('LANGUAGE')) || 'EN'
const language = LANGUAGES[currentLanguage]

const schemaLogin = yup.object({
    user: yup.string().required(language.messages.FieldRequired),
    password: yup.string().required(language.messages.FieldRequired)
})

const schemaPatient = yup.object({
    names: yup.string().required(language.messages.FieldRequired),
    surnames: yup.string().required(language.messages.FieldRequired),
    dni: yup.string().required(language.messages.FieldRequired),
    //.test('unique-dni', 'El DNI ingresado ya ha sido registrado', checkDNI),
    birthdate: yup.date().nullable().typeError(language.messages.InvalidDate).required(language.messages.FieldRequired),
    phone: yup.string().matches(/^[+|\d]\d+$/, language.messages.InvalidFormat).notRequired(),
    address: yup.string().nullable().notRequired(),
})

const schemaNote = yup.object({
    content: yup.string().required(language.messages.FieldRequired)
})


const schemaAppointment = yup.object({
    patient: yup.object().shape({ id: yup.string().required("El paciente ingresado no es válido") }),
    date: yup.string().required(language.messages.FieldRequired),
    time: yup.string().required(language.messages.FieldRequired),
    duration: yup.string().required(language.messages.FieldRequired),
    description: yup.string().nullable().notRequired(),
})

const schemaReminder = yup.object({
    patient: yup.object({ id: yup.string() }).notRequired(),
    date: yup.string().required(language.messages.FieldRequired),
    time: yup.string().required(language.messages.FieldRequired),
    description: yup.string().nullable().notRequired(),
})

const schemaException = yup.object({
    startDate: yup.string().required(language.messages.FieldRequired),
    startTime: yup.string().required(language.messages.FieldRequired),
    endDate: yup.string().required(language.messages.FieldRequired),
    endTime: yup.string().required(language.messages.FieldRequired),
    description: yup.string().nullable().notRequired(),
})

const schemaUserPassword = yup.object({
    currentPassword: yup.string().min(8, language.messages.PasswordMin).required(language.messages.FieldRequired),
    password: yup.string().min(8, language.messages.PasswordMin).required(language.messages.FieldRequired),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], language.messages.FieldsDoNotMatch).required(language.messages.FieldRequired),
})

const schemaTreatment = yup.object({
    description: yup.string().required(language.messages.FieldRequired),
})

export {
    schemaLogin,
    schemaPatient,
    schemaNote,
    schemaException,
    schemaReminder,
    schemaAppointment,
    schemaTreatment,
    schemaUserPassword
}