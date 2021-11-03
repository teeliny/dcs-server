import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
// import cron from 'node-cron'
// import { TaskTimer } from 'tasktimer'
import indexRouter from './routes/index'

const app = express()
const environment = process.env.NODE_ENV || 'development'
const loggerEnv = environment === 'development' ? 'dev' : 'combined'
app.use(cors())
app.use(logger(loggerEnv))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// const task = cron.schedule('*/10 * * * * *', () => {
//   console.log('running every minute 1 and 2')
// })

// task.start()
// const t = new Date()
// console.log(t)
// t.setSeconds(t.getSeconds() + 10)
// console.log(t)

// cron.schedule(`${t.toLocaleString()}`, () =>  {
//   console.log('stopped task')
// }, {
//   scheduled: false
// })

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
