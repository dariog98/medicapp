const handleResponse = ({ response, statusCode, status, message, data, total, totalPages }) => {
    response.status(statusCode).send({
        status: status ?? statusCode,
        message,
        totalPages,
        total,
        data,
    }).end()
}

const handleResponseCustomStatus = (response, httpStatus, status, message, data, errors) => {
    response.status(httpStatus).send({
        status,
        message,
        data,
        errors
    }).end()
}

const handleErrorResponse = (response, statusCode = 500, errorCode = 500, message) => {
    response.status(statusCode).json({
        status: errorCode,
        message
    })
}

export { handleResponse, handleResponseCustomStatus, handleErrorResponse }