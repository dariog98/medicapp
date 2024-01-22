import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Note = sequelize.define(
    'notes',
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Note