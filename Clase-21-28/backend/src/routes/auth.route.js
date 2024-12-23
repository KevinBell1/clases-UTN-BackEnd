import express from 'express'
import { forgotPasswordController, loginController, recoveryPasswordController, registerController, verifyEmailController } from '../controlers/auth.controller.js'
const authRouter = express.Router()
authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/verify-email/:validation_token', verifyEmailController)//validation token se guarda en req.params
authRouter.post('/forgot-password',forgotPasswordController)
authRouter.put('/recovery-password/:reset_token',recoveryPasswordController)

export default authRouter