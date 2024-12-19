import nodemailer from 'nodemailer'
// npm i nodemailer 
import ENVIROMENT from '../src/config/enviroment.js'

const transporterEmail = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: ENVIROMENT.EMAIL_USER,
        pass:ENVIROMENT.EMAIL_PASSWORD
    }
})


export default transporterEmail