import express from "express"
import { buildSchema } from "graphql";
import ProductsDao from "../services/ProductsDao.js";
import { graphqlHTTP } from "express-graphql";
const DAO=await ProductsDao()
const app=express()
const schema=buildSchema(`
    type Product{
        name: String
        price:Int
        rate:Int
        description:String
        id:String
    }
    type query{
        products:[Product]
        productById(id: String):Product
    }
    type mutation{
        addProduct(name:String,price:Int,rate:Int,description:String):Product
    }        
`)
const root={
    clients:async ()=>{const response =await DAO.showProducts()
    if (response.ok) return response.response
    },
    clientsById:async (id)=>{
        return await DAO.showProduct(id)
    },
    addProduct:async(name,price,rate,description)=>{
       return await  DAO.addProduct({name,price,rate,description})
    } 
}

app.use("/graphql",graphqlHTTP({
    schema,
    rootValue:root
}))