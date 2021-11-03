import express from 'express'
import router from './router'

const routers = express.Router()

routers.use('/', router)

export default routers
