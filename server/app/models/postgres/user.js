import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/postgres.js'

const User = sequelize.define(
    'users',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        names : {
            type: DataTypes.STRING,
            allowNull: true
        },
        surnames : {
            type: DataTypes.STRING,
            allowNull: true
        },
        mail : {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone : {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_charge: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, 
    { 
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: {},
            }
        },
        timestamps: false
    }
)

export default User