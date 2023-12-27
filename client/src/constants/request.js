const METHODS = {
    Get: 'GET',
    Post: 'POST',
    Patch: 'PATCH',
    Delete: 'DELETE',
}

const CONTENT_TYPES = {
    JSON: 'application/json'
}

const newRequest = ({ url, method, contentType, userToken, body } = {}) => {
    const headers = new Headers()

    if (userToken) {
        const accessToken = JSON.parse(window.localStorage.getItem('USER'))?.accessToken
        headers.append('Authorization', `Bearer ${accessToken}`)
    }

    if (contentType) headers.append('Content-Type', contentType)

    const request = new Request(url, {
        method: method ?? METHODS.Get,
        headers,
        body: (body && contentType === CONTENT_TYPES.JSON) ? JSON.stringify(body) : body
    })
    return request
}

export {
    newRequest,
    METHODS,
    CONTENT_TYPES
}