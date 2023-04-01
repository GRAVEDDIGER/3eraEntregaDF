import express from "express";
import dotenv from "dotenv";
import logger from "./helper/LoggerConfig.js";
import { buildSchema } from "graphql";
import { middleWareLoader } from "./middlewares/middlewares.js";
import "./routes/graphql.js"
dotenv.config()
const PORT = process.env.PORT || 8080
const app = express();
app.listen(PORT,()=> logger.info.info({level:"info",message:`Server Up in port ${PORT}`}))

middleWareLoader(express,app)
