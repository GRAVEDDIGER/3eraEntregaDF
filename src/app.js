import express from "express";
import dotenv from "dotenv";
import logger from "./helper/LoggerConfig.js";
import { buildSchema } from "graphql";
import ProductsDao from "./services/ProductsDao.js";
import { graphqlHTTP } from "express-graphql";
import { middleWareLoader } from "./middlewares/middlewares.js";
dotenv.config()
const PORT = process.env.PORT || 8080
const app = express();
app.listen(PORT,()=> logger.info.info({level:"info",message:`Server Up in port ${PORT}`}))

middleWareLoader(express,app)
const data={name:"ada",price:0,rate:0,description:"hahahah"}
const DAO=await ProductsDao()
const schema=buildSchema(`
    type Product{
        name: String
        price:Int
        rate:Int
        description:String
        _id:String
    }
    type Query{
        products:[Product]
        productById(id: String):Product
    }
    type Mutation {
        addProduct(name:String,price:Int,rate:Int,description:String):Product
    }        
`)
const root={
    products:async ()=>{const response =await DAO.showProducts()
        console.log(response)
        if (response.ok) return JSON.parse(response.response)
        },
    productById:async (id)=>{
        console.log(id)
        return DAO.showProduct(id.id).then(res=>{console.log(res)
            console.log(res.response)
        return res.response
        }).catch(e=>console.log(e))
    
    },
    addProduct:async(data)=>{
       console.log(data)
        return await DAO.addProduct(data).then(res=>{console.log(res)
        console.log(data)
        return res.response.data
        }).catch(e=>console.log(e))
}}

app.use("/gql",graphqlHTTP({
    schema,
    rootValue:root
}))