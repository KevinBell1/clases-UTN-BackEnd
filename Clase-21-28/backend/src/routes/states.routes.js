import express from 'express'
import postPingController from '../controlers/status.controller.js'
import testMiddleware from '../middlewares/test.middleware.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const statusRouter = express.Router()

statusRouter.post('/ping', authMiddleware,testMiddleware, postPingController) //en este caso ira a testmiddleware antes de postpingcontroller

export default statusRouter