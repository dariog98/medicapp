import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Treatment = sequelize.define(
    'treatments',
    {
        id_profesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
)

export default Treatment