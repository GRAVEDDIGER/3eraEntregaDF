import { Router } from "express";
import { logger } from "../helper/LoggerConfig.js"
 import login from './login.js'
import register from './register.js'
import home from './home.js'
import logout from './logout.js'
import profile from './profile.js'
import addProduct from './addproduct.js'
import showproducts from './showproducts.js'
import addcart from './addcart.js'
import viewcart from './viewcart.js'
import sales from "./sales.js"
const router =Router();
const routes ={ 
    login,
    register,
    home,
    logout,
    profile,
    addProduct,
    showproducts,
    addcart,
    viewcart,
    sales,
    default:router.get((req,res)=>{
        logger.info.info({level:"info",message:"Wrong Route redirecting to /login"})
        res.render("login")
    })
       
    
}


export default routes