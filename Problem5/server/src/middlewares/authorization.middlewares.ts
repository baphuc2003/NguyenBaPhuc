// import { checkSchema } from "express-validator"

// export const accessTokenValidator = checkSchema(
//   {
//     authorization: {
//       custom: {
//         options: async (value, { req }) => {
//           const user_id = req.user_id
//           console.log('check 381 ', user_id)
//           //get publicKey of user_id
//           const publicKey = await database.publicKey.findOne({ user_id: new ObjectId(user_id) })
//           if (!publicKey) {
//             throw new ErrorWithStatus({
//               status: 404,
//               message: 'Public key not found!'
//             })
//           }
//           if (!value) {
//             throw new ErrorWithStatus({
//               status: 401,
//               message: 'Access token is not empty!'
//             })
//           }
//           const token = value.split(' ')[1]
//           //decoded access token
//           const decoded_access_token = await decodeToken({ token: token, secretKey: publicKey.token })
//           console.log('check 288 ', decoded_access_token)
//           req.decoded_access_token = decoded_access_token
//           return true
//         }
//       }
//     }
//   },
//   ['headers']
// )
