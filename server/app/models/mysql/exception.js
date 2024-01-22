import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

const Exception = sequelize.define(
    'exceptions',
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
            allowNull: true
        },
        startDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)

export default Exception