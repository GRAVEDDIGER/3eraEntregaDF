import { Router } from "express";
import { checkAuth } from "../middlewares/authenticated.js";
const router= Router()
router.get("/", checkAuth,(req,res)=>{
    console.log(req.user)
    if (req.isAuthenticated()) res.render("home")
    else res.redirect("/login")
})
export default router