import { Op } from 'sequelize'
import Charge from './charge.js'
import Exception from './exception.js'
import File from './file.js'
import Note from './note.js'
import Patient from './patient.js'
import Reminder from './reminder.js'
import Role from './role.js'
import Treatment from './treatment.js'
import Appointment from './appointment.js'
import User from './user.js'

/* Patient - File */
Patient.hasMany(
    File,{
        foreignKey: 'idPatient'
    }
)

File.belongsTo(
    Patient,{
        foreignKey: 'id',
        as: 'file'
    }
)

/* Patient - Note */
Patient.hasMany(
    Note,{
        foreignKey: 'idPatient'
    }
)

Note.belongsTo(
    Patient,{
        foreignKey: 'id',
        as: 'note'
    }
)

/* Patient - Reminder */
Patient.hasMany(
    Reminder,{
        foreignKey: 'idPatient'
    }
)

Reminder.belongsTo(
    Patient,{
        foreignKey: 'idPatient',
        as: 'patient'
    }
)

/* Patient - Appointment */
Patient.hasMany(
    Appointment,{
        foreignKey: 'idPatient'
    }
)

Appointment.belongsTo(
    Patient,{
        foreignKey: 'idPatient',
        as: 'patient'
    }
)

/* Treatment - Appointment */
Treatment.hasMany(
    Appointment,{
        foreignKey: 'idTreatment'
    }
)

Appointment.belongsTo(
    Treatment,{
        foreignKey: 'idTreatment',
        as: 'treatment'
    }
)

/* Appointment - User */
User.hasMany(
    Appointment,{
        foreignKey: 'idProfesional'
    }
)

User.hasMany(
    Appointment,{
        foreignKey: 'createdBy'
    }
)

User.hasMany(
    Appointment,{
        foreignKey: 'modifiedBy'
    }
)

Appointment.belongsTo(
    User,{
        foreignKey: 'createdBy',
        as: 'createdByUser'
    }
)

Appointment.belongsTo(
    User,{
        foreignKey: 'modifiedBy',
        as: 'modifiedByUser'
    }
)

Appointment.belongsTo(
    User,{
        foreignKey: 'idProfesional',
        as: 'profesional'
    }
)

/* Reminder - User */
User.hasMany(
    Reminder,{
        foreignKey: 'idProfesional'
    }
)

User.hasMany(
    Reminder,{
        foreignKey: 'createdBy'
    }
)

User.hasMany(
    Reminder,{
        foreignKey: 'modifiedBy'
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: 'createdBy',
        as: 'createdByUser'
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: 'modifiedBy',
        as: 'modifiedByUser'
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: 'idProfesional',
        as: 'profesional'
    }
)

/* Exception - User */
User.hasMany(
    Exception,{
        foreignKey: 'idProfesional'
    }
)

User.hasMany(
    Exception,{
        foreignKey: 'createdBy'
    }
)

User.hasMany(
    Exception,{
        foreignKey: 'modifiedBy'
    }
)

Exception.belongsTo(
    User,{
        foreignKey: 'createdBy',
        as: 'createdByUser'
    }
)

Exception.belongsTo(
    User,{
        foreignKey: 'modifiedBy',
        as: 'modifiedByUser'
    }
)

Exception.belongsTo(
    User,{
        foreignKey: 'idProfesional',
        as: 'profesional'
    }
)

/* User - Role */
User.belongsTo(
    Role, {
        foreignKey: 'idRole'
    }
)

/* User - Charge */
User.belongsTo(
    Charge, {
        foreignKey: 'idCharge'
    }
)

/* Treatment - Users */
User.hasMany(
    Treatment, {
        foreignKey: 'idProfesional',
        as: 'treatments'
    }
)

Treatment.belongsTo(
    User, {
        foreignKey: 'idProfesional',
        as: 'profesional'
    }
)

User.getByUsernameOrMail = (data) => {
    return User.scope('withPassword').findOne({
        where: {
            isDeleted: 0, 
            [Op.or]: [{ username: data }, { mail: data }]
        },
        include: [{ model: Role }, { model: Charge }]
    })
}

User.getById = (idUser) => {
    return User.findOne({
        where: {
            isDeleted: 0, 
            id: idUser
        },
        include: [{ model: Role }, { model: Charge }]
    })
}

export { Charge, Exception, File, Note, Patient, Reminder, Role, Treatment, Appointment, User }