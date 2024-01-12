const baseAPI = import.meta.env.VITE_API_SERVER

const RouteAPI = {
    Login: `${baseAPI}/auth/login`,
    Password: `${baseAPI}/auth/password`,
    UserUpdate: `${baseAPI}/auth/update`,
    Profesionals: `${baseAPI}/profesionals`,
    Patients: `${baseAPI}/patients`,
    Files: `${baseAPI}/files`,
    Appointments: `${baseAPI}/appointments`,
    Reminders: `${baseAPI}/reminders`,
    Exceptions: `${baseAPI}/exceptions`,
    Users: `${baseAPI}/users`,
    Roles: `${baseAPI}/roles`,
    Charges: `${baseAPI}/charges`,
    Schedule: `${baseAPI}/schedule`,
    Stats: `${baseAPI}/stats`,
    Treatments: `${baseAPI}/treatments`,
}

export { RouteAPI }