import { Router } from "express"
// import { checkAuth } from "../middlewares/authenticated.js"
const router=Router()
router.get('/',(req,res) => {
if (req.isAuthenticated()) res.render("profile",req.user)
else res.redirect('/login')
})
export default router