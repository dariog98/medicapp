import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()
const hostname = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: hostname,
        dialect: 'mysql'
    }
)

const dbConnectSQL = async() => {
    try {
        await sequelize.authenticate()
        console.log('MySQL connection success')
    } catch (error) {
        console.log(error)
        console.log('MySQL connection error')
    }
}

export { sequelize, dbConnectSQL }