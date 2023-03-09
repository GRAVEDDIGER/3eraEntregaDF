import { ProductsSchema,CartSchema,UserSchema } from "../models/Schemas.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import logger from "../helper/LoggerConfig.js";
dotenv.config()
mongoose.set("strictQuery",false)
class DataResponseClass {
    constructor(status,ok=true,response,error="",statusText){
        this.status = status
        this.ok = ok
        this.response = response
        this.error = error
        this.statusText = statusText
    }
}
export async function CartDao(){
let dbModel
mongoose.set("strictQuery",false)
return await mongoose.connect(process.env.MONGOURL).then(
    async ()=>{
        logger.info.info({level:"info",message:"Cart Db connected"})
        dbModel =await mongoose.model("cartCollection",CartSchema)
        const addCart=async (req,product,id)=>{
            if (product===null ||product===undefined) return new DataResponseClass(400,false,null,"You must provide a product","Error bad request")
            let cart
            logger.warning.warn({level:"warn",message:"Cart ID ",id})

            if (id !== null && id !== undefined){
                logger.warning.warn({level:"warn",message:"ID :",id})
                console.log(id)
                return await dbModel.findById(id).then(response=>{
                    console.log(product)
                    response.products.push(product.response)
                    response.save()
                    return new DataResponseClass(200,true,response,null,"Product Added to cart")
                })
                    .catch(e=>{logger.e.error({level:"error",message:"Error quering"})})
               
            }
            else {
                return await cartCreate(req,product)
            }
            async function cartCreate(req,product){
                try{
                    const user=req.user
                    cart =await dbModel.create({user:{...user},products:product.response})
                    const dbResponse =await cart.save()
                    req.session.cart=(dbResponse["_id"])
                    await req.session.save()
                    const response =new DataResponseClass(200,true,dbResponse,null,"Cart Created")
                    return response
                }catch(error)
                {
                    logger.error.error({level:"error",message:"Unable to create new Cart",error})
                    return new DataResponseClass(400,false,null,error,"Unable to create new Cart")
            }
            }        
                
        }
        const showCart=async (id)=>{
          return await dbModel.findById(id).then(response=>{
            console.log(response,id,"CArtDAoSHow")
                return new DataResponseClass(200,true,response,null,"Query Succeded")
            }).catch(error=>new DataResponseClass(400,false,null,logger.error.error({level:"error",message:"Failed to find Cart "+id,error}),"Error"))
        }
    return {addCart,showCart}
    }
).catch((error)=>logger.error.error({level:"error",message:"Cart Db disconnected",error}))
}
// const adrian = await CartDao()
// console.log(adrian)