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
        foreignKey: 'id_patient'
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
        foreignKey: 'id_patient'
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
        foreignKey: 'id_patient'
    }
)

Reminder.belongsTo(
    Patient,{
        foreignKey: 'id_patient',
        as: 'patient'
    }
)

/* Patient - Appointment */
Patient.hasMany(
    Appointment,{
        foreignKey: 'id_patient'
    }
)

Appointment.belongsTo(
    Patient,{
        foreignKey: 'id_patient',
        as: 'patient'
    }
)

/* Treatment - Appointment */
Treatment.hasMany(
    Appointment,{
        foreignKey: 'id_treatment'
    }
)

Appointment.belongsTo(
    Treatment,{
        foreignKey: 'id_treatment',
        as: 'treatment'
    }
)

/* Appointment - User */
User.hasMany(
    Appointment,{
        foreignKey: 'id_profesional'
    }
)

User.hasMany(
    Appointment,{
        foreignKey: 'created_by'
    }
)

User.hasMany(
    Appointment,{
        foreignKey: 'modified_by'
    }
)

Appointment.belongsTo(
    User,{
        foreignKey: 'created_by',
        as: 'createdByUser'
    }
)

Appointment.belongsTo(
    User,{
        foreignKey: 'modified_by',
        as: 'modifiedByUser'
    }
)

Appointment.belongsTo(
    User,{
        foreignKey: 'id_profesional',
        as: 'profesional'
    }
)

/* Reminder - User */
User.hasMany(
    Reminder,{
        foreignKey: 'id_profesional'
    }
)

User.hasMany(
    Reminder,{
        foreignKey: 'created_by'
    }
)

User.hasMany(
    Reminder,{
        foreignKey: 'modified_by'
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: 'created_by',
        as: 'createdByUser'
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: 'modified_by',
        as: 'modifiedByUser'
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: 'id_profesional',
        as: 'profesional'
    }
)

/* Exception - User */
User.hasMany(
    Exception,{
        foreignKey: 'id_profesional'
    }
)

User.hasMany(
    Exception,{
        foreignKey: 'created_by'
    }
)

User.hasMany(
    Exception,{
        foreignKey: 'modified_by'
    }
)

Exception.belongsTo(
    User,{
        foreignKey: 'created_by',
        as: 'createdByUser'
    }
)

Exception.belongsTo(
    User,{
        foreignKey: 'modified_by',
        as: 'modifiedByUser'
    }
)

Exception.belongsTo(
    User,{
        foreignKey: 'id_profesional',
        as: 'profesional'
    }
)

/* User - Role */
User.belongsTo(
    Role, {
        foreignKey: 'id_role'
    }
)

/* User - Charge */
User.belongsTo(
    Charge, {
        foreignKey: 'id_charge'
    }
)

/* Treatment - Users */
User.hasMany(
    Treatment, {
        foreignKey: 'id_profesional',
        as: 'treatments'
    }
)

Treatment.belongsTo(
    User, {
        foreignKey: 'id_profesional',
        as: 'profesional'
    }
)

User.getByUsernameOrMail = (data) => {
    return User.scope('withPassword').findOne({
        where: {
            is_deleted: false, 
            [Op.or]: [{ username: data }, { mail: data }]
        },
        include: [{ model: Role }, { model: Charge }]
    })
}

User.getById = (idUser) => {
    return User.findOne({
        where: {
            is_deleted: false, 
            id: idUser
        },
        include: [{ model: Role }, { model: Charge }]
    })
}

export { Charge, Exception, File, Note, Patient, Reminder, Role, Treatment, Appointment, User }