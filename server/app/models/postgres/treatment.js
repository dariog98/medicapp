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
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    { timestamps: false }
)

export default Treatment