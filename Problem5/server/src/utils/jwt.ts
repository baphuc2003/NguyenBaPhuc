import jwt from 'jsonwebtoken'
import { ErrorWithStatus } from '~/model/errors'

export const generateToken = ({
  payload,
  privateKey,
  option
}: {
  payload: string | object | Buffer
  privateKey: string
  option: jwt.SignOptions | undefined
}) => {
  const token = jwt.sign(payload, privateKey, option)
  return token
}

export const decodeToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(
          new ErrorWithStatus({
            status: 401,
            message: 'Decoded token is failed'
          })
        )
      }
      resolve(decoded)
    })
  })
}
