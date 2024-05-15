import database from './services/database.services'

import express, { NextFunction } from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import productRoute from './routes/product.route'
import { omit } from 'lodash'
import { ErrorWithStatus } from './model/errors'
import { Request, Response } from 'express'
import usersRouter from './routes/user.route'

const app = express()

//connect to Mongodb
database.connect()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/product', productRoute)
app.use('/user', usersRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status || 500).json(omit(err, 'status'))
  }

  return res.status(500).json({
    message: err.message,
    errorInfor: err
  })
})

app.listen(process.env.PORT || 4001, () => {
  console.log(`App iss running on port ${process.env.PORT}`)
})
