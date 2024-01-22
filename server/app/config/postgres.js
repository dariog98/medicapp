import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()
const hostname = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
const port = process.env.DB_PORT

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: hostname,
        port: port,
        dialect: 'postgres'
    }
)

const dbConnectSQL = async() => {
    try {
        await sequelize.authenticate()
        console.log('Postgres connection success')
    } catch (error) {
        console.log(error)
        console.log('Postgres connection error')
    }
}

export { sequelize, dbConnectSQL }