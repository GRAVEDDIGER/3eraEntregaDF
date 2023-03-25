import { Router } from "express";
import passport from "passport";

const router =Router()

router.get("/",(req,res)=>{
    res.render("login")
})
router.get("/failed",(req,res)=>{
    
    res.render("login",{isError:true,message:req.flash("error")[0]})
})

router.get("/goa",passport.authenticate("google",{scope:["openid","profile","email","https://www.googleapis.com/auth/user.birthday.read","https://www.googleapis.com/auth/user.phonenumbers.read","https://www.googleapis.com/auth/user.gender.read","https://www.googleapis.com/auth/user.addresses.read"]}))

router.post("/",passport.authenticate("login",{successRedirect:"/home" ,failureRedirect:"/login/failed",failureFlash:true}))

export default router