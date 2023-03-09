import { Router } from "express";
import passport from "passport";
import axios from "axios";
import fs from "fs";
import transporter from "../helper/mailer.js";
import dotenv from "dotenv"
dotenv.config()
const router =Router()

router.get("/",(req,res)=>{
    res.render("register")
})
router.get("/failed",(req,res)=>{
    console.log(req.flash('error'))
    res.render("register",{isError:true,message:req.flash("error")[0]})
})
router.post("/",getImage,passport.authenticate("register",{failureRedirect:"/register/failed",failureFlash:true}),async (req,res)=>{
    const {nombre,apellido,edad,adress,phone,username}=req.user
   await transporter.sendMail({
        from:process.env.FROM_EMAIL,
        to:["rsxabadin@gmail.com"],
        subject:"New User Registred",
        html:`<div style="background-color: #fff; border: 1px solid #ccc; border-radius: 4px; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Nuevo registro de usuario</h1>
        <p style="color: #333; margin-bottom: 20px;">Estimado administrador,</p>
        <p style="color: #333; margin-bottom: 20px;">Un nuevo usuario (${username}) se ha registrado en nuestro sitio web:</p>
        <ul style="color: #333; list-style-type: none; padding: 0; margin-bottom: 20px;">
          <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${nombre}</li>
          <li style="margin-bottom: 10px;"><strong>Apellido:</strong> ${apellido}</li>
          <li style="margin-bottom: 10px;"><strong>Edad:</strong> ${edad}</li>
          <li style="margin-bottom: 10px;"><strong>Teléfono:</strong> ${phone}</li>
          <li style="margin-bottom: 10px;"><strong>Dirección:</strong> ${adress}</li>
        </ul>
        <p style="color: #333;">Gracias,</p>
        <p style="color: #333;">El equipo de nuestro sitio web</p>
      </div>`
    })
res.redirect("home")
})
async function getImage(req,res,next){
    const response = await axios.get(req.body.avatar,{responseType:"stream"})
    const fileName=Date.now().toString()
    response.data.pipe(fs.createWriteStream("./src/public/images/"+fileName+".jpg"))
    req.body.avatar="/images/"+fileName+".jpg"
next()
}
export default router