import * as yup from 'yup'

const schemaLogin = yup.object({
    user: yup.string().required('El campo no puede estar vacio'),
    password: yup.string().required('El campo no puede estar vacio')
})

export {
    schemaLogin
}