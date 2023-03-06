import { Router } from "express";
import passport from "passport";
const router =Router()

router.get("/",(req,res)=>{
    res.render("register")
})
router.get("/failed",(req,res)=>{
    console.log(req.flash('error'))
    res.render("register",{isError:true,message:req.flash("error")[0]})
})
router.post("/",passport.authenticate("register",{successRedirect:"/login",failureRedirect:"/register/failed",failureFlash:true}))

export default router