import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Appointment = sequelize.define(
    'appointments',
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
            allowNull: false
        },
        id_treatment: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        date_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.TIME,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Appointment