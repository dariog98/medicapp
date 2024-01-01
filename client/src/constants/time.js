const TIMEZONES = [
    { string: 'America/Argentina/Buenos_Aires', numeric: '-03:00', description: 'Buenos Aires (GMT -03:00)'},
    { string: 'UTC', numeric: '-00:00', description: 'Tiempo Universal (GMT 00:00)'},
]

const Buenos_Aires = TIMEZONES[0]
const UTC = TIMEZONES[1]

const TOAST_TIME = {
    Short: 3000
}

export { TIMEZONES, Buenos_Aires, UTC, TOAST_TIME }