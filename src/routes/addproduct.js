import { Router } from "express";
import ProductsDao from "../services/ProductsDao.js";
const router=Router()
router.get("/",(req,res)=>{
    res.render("addproduct")
})
router.post("/",async (req,res)=>{
    const DAO = await ProductsDao()   
    const {name,precio,rate,description}=req.body
    // console.log(price)
  const   response=await DAO.addProduct({name,price:parseInt(precio),rate:parseInt(rate),description:description})
  console.log(response)  
  try {

} catch (error) {
    res.send(error)
}
})
export default router