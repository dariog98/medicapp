const getStringDateInTimeZone = (date, timeZone) => {
    const [ month, day, year ] = date.toLocaleString('en-EN', { year: 'numeric', month: '2-digit', day:'2-digit', timeZone: timeZone.string }).split('/')
    return `${year}-${month}-${day}`
}

const getStringTimeInTimeZone = (date, timeZone) => {
    const time = date.toLocaleString('en-EN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: timeZone.string })
    return time
}

const getStringDateTimeInLanguageTimeZone = (date, language, timeZone) => {
    return date.toLocaleString(
        language, 
        { 
            year: 'numeric',
            month: 'long',
            day:'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone.string
        }
    )
}

const getStringDateInLanguageTimeZone = (date, language, timeZone) => {
    return date.toLocaleString(
        language, 
        { 
            year: 'numeric',
            month: 'long',
            day:'numeric',
            timeZone: timeZone.string
        }
    )
}

const getStringMonthInLanguageTimeZone = (date, language, timeZone) => {
    return date.toLocaleString(language, { month: 'long', timeZone: timeZone.string })
}

const newDateInTimeZone = (timeZone, year = 2000, month = 1, date = 1, hours = 0, minutes = 0, seconds = 0) => {
    const YYYY = Number(year).toString().padStart(4, 0)
    const MM = Number(month).toString().padStart(2, 0)
    const DD = Number(date).toString().padStart(2, 0)
    const hh = Number(hours).toString().padStart(2, 0)
    const mm = Number(minutes).toString().padStart(2, 0)
    const ss = Number(seconds).toString().padStart(2, 0)

    return new Date(`${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}${timeZone.numeric}`)
}

export {
    getStringDateInTimeZone,
    getStringTimeInTimeZone,
    getStringMonthInLanguageTimeZone,
    getStringDateInLanguageTimeZone,
    getStringDateTimeInLanguageTimeZone,
    newDateInTimeZone
}