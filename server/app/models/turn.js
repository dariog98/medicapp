import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Turn = sequelize.define(
    'turns',
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
            allowNull: false
        },
        idTreatment: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dateTime: {
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
    }
)

export default Turn