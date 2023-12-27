const catchedAsync = (fn) => {
    return (request, response, next) => {
        fn(request, response).catch(error => next(error))
    }
}

export { catchedAsync }