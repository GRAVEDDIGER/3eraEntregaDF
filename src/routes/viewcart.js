import { Router } from "express";
import { CartDao } from "../services/CartDAO.js";
import logger from "../helper/LoggerConfig.js";
const routes=Router()
routes.get("/",async (req,res)=>{
const DAO =await CartDao()
console.log(req.session.cart)
const response =await DAO.showCart(req.session.cart)
let products

products = JSON.parse(JSON.stringify(response.response))
logger.debug.debug({level:"debug",message:"Products displayed",products})
res.render("viewcart",response.ok? products:null)
})
export default routes