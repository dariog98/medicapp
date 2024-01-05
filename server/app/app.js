import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index.js'
import { handleErrorResponse } from './helpers/handleResponse.js'

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
    console.log('API ready')
    console.log('Port:', PORT)
    console.log('Platform:', PLATFORM)
})

export default app