import { Request } from 'express'
declare module 'express' {
  interface Request {
    user?: User
    decoded_refresh_token?: RefreshToken
  }
}
