const snakeToCamel = (string) => {
    return string.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    )
}

const snakeToCamelObject = (object = {}) => {
    return Object.keys(object).reduce((accumulator, current) => {
        //const value = typeof object[current] === 'object' && object[current] !== null ? snakeToCamelObject(object[current]) : object[current]
        //accumulator[snakeToCamel(current)] = value
        accumulator[snakeToCamel(current)] = object[current]
        return accumulator
    }, {})
}

export { snakeToCamel, snakeToCamelObject }