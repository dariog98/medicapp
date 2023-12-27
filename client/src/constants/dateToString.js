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

export {
    getStringDateInTimeZone,
    getStringTimeInTimeZone,
    getStringMonthInLanguageTimeZone,
    getStringDateInLanguageTimeZone,
    getStringDateTimeInLanguageTimeZone
}