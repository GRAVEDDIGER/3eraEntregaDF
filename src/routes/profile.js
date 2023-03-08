import { Router } from "express"
// import { checkAuth } from "../middlewares/authenticated.js"
const router=Router()
router.get('/',(req,res) => {
    console.log(req.user)
if (req.isAuthenticated()) res.render("profile",req.user)
else res.redirect('/login')
})
export default router