import mongoose from "mongoose";
import logger from "../helper/LoggerConfig.js";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.MONGOURL).then(()=>logger.info.info({level:"info",message:"Mongo Connected"}))
        .catch(error=>{logger.error.error({level:"error",error})})

export const UserSchema = mongoose.Schema({
    age:Number,
    avatar:String,
    name:String,
    address:String,
    lastname:String,
    phone:Number,
    phonePrefix:Number
})
export const UserModel =mongoose.model("users",UserSchema)