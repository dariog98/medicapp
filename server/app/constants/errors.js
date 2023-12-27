class ClientError extends Error {
    constructor(message, statusCode = 400, errorCode) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode ?? statusCode
    }
}

class ServerError extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
    }
}

export {
    ClientError, ServerError
}