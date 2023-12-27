import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Note = sequelize.define(
    'notes',
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idPatient: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
)

export default Note