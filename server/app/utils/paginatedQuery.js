const paginatedQuery = async (model, rows = 100, page = 1, order = ['id', 'ASC'], params = {}, include) => {
    const limit = rows
    const offset = limit * (page - 1)

    const where = Object.keys(params).reduce((accumulator, current) => {
        if (params[current] !== undefined && params[current] !== '') accumulator[current] = params[current]
        return accumulator
    }, {})

    const { count: total, rows: data } = await model.findAndCountAll({ offset, limit, order: [ order ], where, include })
    return {
        page,
        totalPages: Math.ceil(total / rows),
        total: total ?? 0,
        data
    }
}

export { paginatedQuery }