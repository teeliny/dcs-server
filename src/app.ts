import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import indexRouter from './routes/index'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'

const app = express()
const environment = process.env.NODE_ENV || 'development'
const loggerEnv = environment === 'development' ? 'dev' : 'combined'
app.use(cors())
app.use(logger(loggerEnv))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req:Request, res:Response, next:NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err:HttpError, req:Request, res:Response) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
