import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

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
        idRole: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCharge: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
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