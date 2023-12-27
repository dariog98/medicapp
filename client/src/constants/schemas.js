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

const schemaNotes = yup.object({
    content: yup.string().required(language.messages.FieldRequired)
})

export {
    schemaLogin,
    schemaPatient,
    schemaNotes
}