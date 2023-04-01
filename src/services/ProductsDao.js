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
export async function ProductsDao(){
    let dbModel
        return await mongoose.connect(process.env.MONGOURL).then(()=>{
            logger.info.info({level:"info",message:"Connected to Mongoose"})
            dbModel=mongoose.model("ProductCollection",ProductsSchema)
            const addProduct =async (product)=>{
                console.log(product)
                        try{ 
                            const data = new dbModel(product)
                            data.save()
                            const response = new DataResponseClass(200,true,{data},null,"Successful Insertion") 
                        logger.info.info({level:"info",response})
                    
                        return response
                        }catch(error){logger.error.error({level:"error",message:"Error adding product",error,product})
                        return new DataResponseClass(400,false,error,error,"Error adding product")
                    }}
                    const updateProduct =async (product,id)=>{
                        try{ 
                        const response = new DataResponseClass(200,true,await dbModel.findOneAndUpdate(id,product),null,"Successful Update") 
                        logger.info.info({level:"info",response})
                    
                        return response
                        }catch(error){logger.error.error({level:"error",message:"Error on Update",errorerror})
                        return new DataResponseClass(400,false,null,error,"Error on Update")
                    }}
                    const deleteProduct =async (id)=>{
                        try{ 
                        const response = new DataResponseClass(200,true,await dbModel.findOneAndDelete(id),null,"Successful Delete") 
                        logger.info.info({level:"info",response})
                    
                        return response
                        }catch(error){logger.error.error({level:"error",message:"Error on Delete",error})
                        return new DataResponseClass(400,false,null,error,"Error on Delete")
                    }}
                    const showProduct =async (id)=>{
                        try{ 
                        const data=await dbModel.findById(id)
                        const response = new DataResponseClass(200,true,data,null,"Data Queried")                         
                        logger.info.info({level:"info",response})
                        return response
                        }catch(error){logger.error.error({level:"error",message:"Error on Query",error})
                        return new DataResponseClass(400,false,null,error,"Error on Query")
                    }}
                    const showProducts =async ()=>{
                        try{ 
                        const response = new DataResponseClass(200,true,JSON.stringify(await dbModel.find({}).lean()),null,"Data Queried") 
                        logger.info.info({level:"info",response})
                    
                        return response
                        }catch(error){logger.error.error({level:"error",message:"Error on Query",error})
                        return new DataResponseClass(400,false,null,error,"Error on Query")
                    }}
                    return {addProduct,updateProduct,deleteProduct,showProduct,showProducts}
                   
        }).catch(error=>{logger.error.error({level:"error",message:"Error connecting to Mongo",error})})
        


}
export default ProductsDao