import { Router } from "express";
import ProductsDao from "../services/ProductsDao.js";
const routes=Router()
routes.get("/",async (req,res)=>{
    const DAO = await ProductsDao()
    const data = await DAO.showProducts()
   let products = JSON.parse(data.response)
  
   console.log(typeof products,products)
//    products.forEach(product => console.log(product,"algo"))
    res.render("showproducts",{products:[...products]})})
routes.get("/:id",(req,res)=>{
const {id}=req.params
res.render("showProduct")
})
export default routes