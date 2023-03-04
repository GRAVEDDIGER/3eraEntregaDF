import { Router } from "express";
import { logger } from "../helper/LoggerConfig"
 
const router =Router();

router.get((req,res)=>{
    logger.info.info({level:"info",message:"Wrong Route redirecting to /login"})
    res.render("login")
})

export default router