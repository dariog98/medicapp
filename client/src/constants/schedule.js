const getWeeksInMonth = (year, month) => {
    const weeks = []
    const firstDate = new Date(Date.UTC(year, month, 1))
    const lastDate  = new Date(Date.UTC(year, month + 1, 0))

    const weeksCount = Math.ceil((firstDate.getUTCDay() + lastDate.getUTCDate()) / 7)

    if (firstDate.getUTCDay() !== 0) {
        firstDate.setUTCDate(firstDate.getUTCDate() - firstDate.getUTCDay())
    }

    if (lastDate.getUTCDay() !== 6) {
        lastDate.setUTCDate(lastDate.getUTCDate() + (6 - lastDate.getUTCDay()))
    }

    const date = firstDate

    for (let week = 0; week < weeksCount; week++) {
        const weeksDays = []
        for (let day = 0; day < 7; day++) {
            weeksDays.push(new Date(date))
            date.setUTCDate(date.getUTCDate() + 1)
        }
        weeks.push(weeksDays)
    }

    return weeks
}

const isTheSameDate = (dateOne, dateTwo) => {
    return (
        dateOne.getUTCFullYear() === dateTwo.getUTCFullYear() &&
        dateOne.getUTCMonth() === dateTwo.getUTCMonth() &&
        dateOne.getUTCDate() === dateTwo.getUTCDate()
    )
}

const getEventHeight = (dateStart, dateEnd, eventStart, eventEnd) => {
    const start = eventStart > dateStart ? eventStart : dateStart
    const end = eventEnd < dateEnd ? eventEnd : dateEnd
    return (Math.abs((end - start)) / 1000) / 3600
}

const getEventPositionY = (dateStart, eventStart) =>{
    const start = eventStart > dateStart ? eventStart : dateStart
    return (Math.abs((start - dateStart)) / 1000) / 3600
}

export {
    getWeeksInMonth,
    isTheSameDate,
    getEventHeight,
    getEventPositionY,
}