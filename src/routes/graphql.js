import { buildSchema } from "graphql";
import ProductsDao from "../services/ProductsDao.js";
const DAO=await ProductsDao()
export const schema=buildSchema(`
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
        updateProduct(name:String,price:Int,rate:Int,description:String,id:String):Product
        deleteProduct(id: String):Product
    }        
`)
export const root={
    products:async ()=>{const response =await DAO.showProducts()
        if (response.ok) return JSON.parse(response.response)
        },
    productById:async (id)=>{
        return DAO.showProduct(id.id).then(res=>{console.log(res)
            console.log(res.response)
        return res.response
        }).catch(e=>console.log(e))
    
    },
    addProduct:async(data)=>{
        return await DAO.addProduct(data).then(res=>{console.log(res)
        console.log(data)
        return res.response.data
        }).catch(e=>console.log(e))
},
    updateProduct:async(data)=>{
        const {id}=data
        return await DAO.updateProduct(data,id).then(res=>{
            console.log(res)
            return res.response
        }).catch(e=>console.log(e))
    },
    deleteProduct: async(id)=>{ 
        return await DAO.deleteProduct(id.id).then(res=>{
            return res.response
        }).catch(e=>console.log(e))
    }
}

