import { Router } from "express";
import transporter from "../helper/mailer.js";
import client from "../helper/twilio.js";
const router=Router()
router.get("/",async (req,res)=>{
const {username,nombre,apellido,edad,phone,adress}=req.user
const cart=req.session.cart
await transporter.sendMail({
    from:process.env.FROM_EMAIL,
    to:["rsxabadin@gmail.com"],
    subject:"Compra ingresada",
    html:`<div style="background-color: #fff; border: 1px solid #ccc; border-radius: 4px; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Nueva compra ingresada</h1>
    <p style="color: #333; margin-bottom: 20px;">Estimado administrador,</p>
    <p style="color: #333; margin-bottom: 20px;">El usuario (${username}) ha registrado un nuevo pedido en nuestro sitio web:</p>
    <ul style="color: #333; list-style-type: none; padding: 0; margin-bottom: 20px;">
      <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${nombre}</li>
      <li style="margin-bottom: 10px;"><strong>Apellido:</strong> ${apellido}</li>
      <li style="margin-bottom: 10px;"><strong>Edad:</strong> ${edad}</li>
      <li style="margin-bottom: 10px;"><strong>Teléfono:</strong> ${phone}</li>
      <li style="margin-bottom: 10px;"><strong>Dirección:</strong> ${adress}</li>
    </ul>
    <h2>Carrito ID: ${cart}</h2>
    <p style="color: #333;">Gracias,</p>
    <p style="color: #333;">El equipo de nuestro sitio web</p>
  </div>`
})
client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: `*NUEVA COMPRA INGRESADA*\nEl usuario: ${username} genero la compra del carrito *${cart}*`,
         to: 'whatsapp:+5492344426406'
       })
      .then(message => console.log(message.sid));
res.render("sales")
})
export default router