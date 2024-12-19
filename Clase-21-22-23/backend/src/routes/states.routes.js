import express from 'express'
import postPingController from '../controlers/status.controller.js'
const statusRouter = express.Router()

statusRouter.post('/ping', postPingController)

export default statusRouter