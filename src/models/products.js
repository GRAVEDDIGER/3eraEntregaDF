import { Schema } from "mongoose";

export const productSchema=new Schema({
    name:String,
    price:Number,
    description:String,
    rate:Number,

})