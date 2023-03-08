import { Schema } from "mongoose";
export const UserSchema = new Schema({
    nombre:{type:String},
    apellido:{type:String},
    edad:{type:Number},
    phone:{type:String},
    adress:{type:String},
    avatar:{type:String},
    username:{type:String},

  })
export  const ProductsSchema=new Schema({
    name:String,
    price:Number,
    rate:Number,
    description:String
  },{timestamps:true});


export const CartSchema = new Schema({
    user:UserSchema,
    products:[ProductsSchema]   
},{timestamps:true})