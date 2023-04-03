import { Router } from "express";
import passport from "passport";

const router =Router()

router.get("/",(req,res)=>{
    res.render("login")
})
router.get("/failed",(req,res)=>{
    
    res.render("login",{isError:true,message:req.flash("error")[0]})
})

router.get("/goa",passport.authenticate("google",{scope:[
    "openid",
    "profile",
    "email",
    "https://www.googleapis.com/auth/contacts",
    "https://www.googleapis.com/auth/directory.readonly",
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/user.birthday.read",
    "https://www.googleapis.com/auth/user.phonenumbers.read",
    "https://www.googleapis.com/auth/user.gender.read",
    "https://www.googleapis.com/auth/user.addresses.read",
    "https://www.googleapis.com/auth/user.organization.read",

]}))

router.post("/",passport.authenticate("login",{successRedirect:"/viewProducts" ,failureRedirect:"/login/failed",failureFlash:true}))

export default router