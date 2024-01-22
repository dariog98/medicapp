import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const Charge = sequelize.define(
    'charges',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    { timestamps: false }
)

export default Charge