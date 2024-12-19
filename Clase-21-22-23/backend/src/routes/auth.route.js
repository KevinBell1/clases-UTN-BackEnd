import express from 'express'
import registerController, { loginController, verifyEmailController } from '../controlers/auth.controller.js'





const authRouter = express.Router()

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)
//validation token se guarda en req.params
authRouter.get('/validate-email/:validation_token', verifyEmailController)


export default authRouter