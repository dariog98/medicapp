import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './app/routes/index.js'
import { dbConnectSQL } from './app/config/mysql.js'
import { handleErrorResponse } from './app/helpers/handleResponse.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const PLATFORM = process.platform

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)

app.use((error, request, response, next) => {
    console.log(error)
    const { statusCode, errorCode, message } = error
    handleErrorResponse(response, statusCode, errorCode, message)
})


app.listen(PORT, () => {
    console.log('API lista')
    console.log('Puerto:', PORT)
    console.log('Plataforma:', PLATFORM)
})

dbConnectSQL()