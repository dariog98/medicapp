import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const File = sequelize.define(
    'files',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default File