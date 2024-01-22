import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Patient = sequelize.define(
    'patients',
    {
        names: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surnames: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    }, 
    { timestamps: false }
)

export default Patient