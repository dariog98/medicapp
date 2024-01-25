import pg from 'pg'
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()
const hostname = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
const port = process.env.DB_PORT
const mode = process.env.MODE

const config = mode === 'DEV' ? {
    host: hostname,
    port: port,
    dialect: 'postgres',
    dialectModule: pg,
} : {
    host: hostname,
    port: port,
    dialect: 'postgres',
    dialectModule: pg,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true
        }
    }
}

const sequelize = new Sequelize(
    database,
    username,
    password,
    config,
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