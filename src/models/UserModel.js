import mongoose from "mongoose";
import logger from "../helper/LoggerConfig.js";
import dotenv from "dotenv"
dotenv.config()
const dbConnect=async ()=>{
    mongoose.set("strictQuery",true)
    try{ 
   await mongoose.connect(process.env.MONGOURL,{bufferCommands:false}).then(()=>logger.info.info({level:"info",message:"Mongo Connected"}))
    
}catch(e){logger.error.error({level:"error",message:"Failed to connect",error:e})}
}
// mongoose.connect(process.env.MONGOURL,{useNewUrlParser: true}).then(()=>{logger.info.info({level:"info",message:"Mongo Connected"})

// }).catch(error=>{logger.error.error({level:"error",error})})
await dbConnect()

export const UserSchema =new mongoose.Schema({
    age:Number,
    avatar:String,
    name:String,
    address:String,
    lastname:String,
    phone:Number,
    phonePrefix:Number
})
export const UserModel =mongoose.model("localcollections",UserSchema)
