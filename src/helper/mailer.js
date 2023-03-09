import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
const FROM_EMAIL =process.env.FROM_EMAIL
const PASS=process.env.GMAILPASS
console.log(PASS,FROM_EMAIL)
const transporter = createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:FROM_EMAIL,
        pass:PASS
    }
})

export default transporter