import { Router } from "express";
import { logger } from "../helper/LoggerConfig.js"
 import login from './login.js'
import register from './register.js'
const router =Router();
const routes ={ 
    login,
    register,
    default:router.get((req,res)=>{
        logger.info.info({level:"info",message:"Wrong Route redirecting to /login"})
        res.render("login")
    })
       
    
}


export default routes