import express from 'express'
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { ErrorWithStatus } from './model/Error'
import { omit } from 'lodash'
import usersRouter from './routes/user.route'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { accessTokenAuthorization } from './middlewares/user.middlewares'

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'user_id']
  }
})

const userLikes: { [key: string]: number } = {}

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  socket.on('join', (user_id) => {
    if (!userLikes[user_id]) {
      userLikes[user_id] = 0
    }
    socket.emit('likedupdate', userLikes[user_id])
  })

  socket.on('liked', async ({ user_id, currentPoint, access_token }) => {
    try {
      const decoded_access_token = await accessTokenAuthorization(user_id, access_token)
      if (userLikes[user_id] !== undefined) {
        userLikes[user_id] = currentPoint + 1
        io.emit('likedupdate', { user_id, count: userLikes[user_id] })
      }
    } catch (error) {
      socket.emit('loginRequired', { message: 'Please login again!' })
    }
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

// Middleware để parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Middleware để parse application/json
app.use(bodyParser.json())

// Sử dụng CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'user_id']
  })
)

// Sử dụng router cho các routes của người dùng
app.use('/user', usersRouter)

// Middleware xử lý lỗi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status || 500).json(omit(err, 'status'))
  }

  return res.status(500).json({
    message: err.message,
    errorInfo: err
  })
})

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
