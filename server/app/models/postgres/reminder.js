import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Reminder = sequelize.define(
    'reminders',
    {
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_profesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_patient: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        date_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Reminder