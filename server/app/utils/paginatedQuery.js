const cleanObject = (obj) => {
    return Object.keys(obj).reduce((accumulator, current) => {
        console.log({ accumulator, current, value: obj[current] })
        if (obj[current] !== undefined && obj[current] !== '') accumulator[current] = obj[current]
        return accumulator
    }, {})
}

const paginatedQuery = async (model, rows = 100, page = 1, order = ['id', 'ASC'], params = {}, include, literalParams) => {
    const limit = rows
    const offset = limit * (page - 1)

    const where = { ...cleanObject(params), ...literalParams }

    const { count: total, rows: data } = await model.findAndCountAll({ offset, limit, order: [ order ], where, include })
    return {
        page,
        totalPages: Math.ceil(total / rows),
        total: total ?? 0,
        data
    }
}

export { paginatedQuery }