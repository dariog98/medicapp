import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

const Treatment = sequelize.define(
    'treatments',
    {
        idProfesional: {
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