import { Router } from "express";
import passport from "passport";
import axios from "axios";
import fs from "fs";
const router =Router()

router.get("/",(req,res)=>{
    res.render("register")
})
router.get("/failed",(req,res)=>{
    console.log(req.flash('error'))
    res.render("register",{isError:true,message:req.flash("error")[0]})
})
router.post("/",getImage,passport.authenticate("register",{successRedirect:"/login", failureRedirect:"/register/failed",failureFlash:true}))
async function getImage(req,res,next){
    const response = await axios.get(req.body.avatar,{responseType:"stream"})
    const fileName=Date.now().toString()
    response.data.pipe(fs.createWriteStream("./src/public/images/"+fileName+".jpg"))
    req.body.avatar="/images/"+fileName+".jpg"
next()
}
export default router