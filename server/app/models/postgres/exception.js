import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Exception = sequelize.define(
    'exceptions',
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
            allowNull: true
        },
        start_date_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date_time: {
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

export default Exception