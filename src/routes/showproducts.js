import { Router } from "express";
import axios from "axios"
const routes=Router()
routes.get("/",async (req,res)=>{
    const products = await axios.post('http://localhost:8080/gql', {
        query: `
          {
            products {
              name
              price
              rate
              description
            }
          }
        `
      });
    res.render("showproducts",{products:products.data.data.products})})
routes.get("/:id",async (req,res)=>{
const {id}=req.params
const products = await axios.post('http://localhost:8080/gql', {
    query: `
      {
        productById (id:"${id}") {name,price,rate,description} 
      }
    `
  });

res.render("showproduct",products.data.data.productById)
})
export default routes