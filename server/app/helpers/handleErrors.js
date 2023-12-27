import { handleResponse } from './handleResponse.js'

const httpError = (response, errors) => {
    console.log(errors)
    const status = 500
    const message = 'An error ocurred'
    handleResponse(response, status, message, undefined, errors)
}

export { httpError }