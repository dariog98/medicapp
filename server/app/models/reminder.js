import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Reminder = sequelize.define(
    'reminders',
    {
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idProfesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPatient: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)

export default Reminder