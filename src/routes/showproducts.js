import { Router } from "express";
import ProductsDao from "../services/ProductsDao.js";
const routes=Router()
routes.get("/",async (req,res)=>{
    const DAO = await ProductsDao()
    const data = await DAO.showProducts()
   let products = JSON.parse(data.response)
    res.render("showproducts",{products:products})})
routes.get("/:id",async (req,res)=>{
const {id}=req.params
console.log(id)
const DAO =await ProductsDao()
console.log(DAO)
const data = await DAO.showProduct(id)
console.log(data)
res.render("showproduct",data.response)
})
export default routes