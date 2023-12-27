const addTime = (date, time) => {
    const resultDate = new Date(date.toISOString())
    const splitDuration = time.split(":").map(result => Number(result))

    resultDate.setHours(resultDate.getHours() + splitDuration[0])
    resultDate.setMinutes(resultDate.getMinutes() + splitDuration[1])
    resultDate.setSeconds(resultDate.getSeconds() + splitDuration[2])

    return resultDate
}

export { addTime }