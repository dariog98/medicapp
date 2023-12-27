const DAYS = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
}

const TIMEZONES = [
    { string: 'America/Argentina/Buenos_Aires', numeric: '-03:00', description: 'Buenos Aires (GMT -03:00)'},
    { string: 'UTC', numeric: '-00:00', description: 'Tiempo Universal (GMT 00:00)'},
]

const BuenosAires = TIMEZONES[0]
const UTC = TIMEZONES[1]

const getDayInTimeZone = (date, timeZone) => {
    const day = date.toLocaleString('en-EN', { weekday: 'long', timeZone: timeZone.string }).toLowerCase()
    console.log({ day })
    return DAYS[day]
}

const getStringDateInTimeZone = (date, timeZone) => {
    const [ month, day, year ] = date.toLocaleString("en-EN", { year: "numeric", month: "2-digit", day:"2-digit", timeZone: timeZone.string }).split("/")
    return `${year}-${month}-${day}`
}

const isDateTimeEnabled = (dateTime, duration, worktimes) => {
    const start = new Date(dateTime.toISOString())
    const end = new Date(dateTime.toISOString())
    const [hours, minutes] = duration.split(':')
    end.setUTCHours(start.getUTCHours() + parseInt(hours))
    end.setUTCMinutes(start.getUTCMinutes() + parseInt(minutes))
    
    for (let index = 0; index < worktimes.length; index++) {
        if (worktimes[index].startTime <= start && end <= worktimes[index].endTime) {
            return true
        }
    }
    return false
}

export {
  TIMEZONES,
  BuenosAires,
  UTC,
  getDayInTimeZone,
  getStringDateInTimeZone,
  isDateTimeEnabled
}