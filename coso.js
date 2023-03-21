import * as MongoDAO from "./mongoDAO.js"
const URL = "mongodb+srv://dcsweb:MopG23GHLEu3GwB0@dcsweb.snm3hyr.mongodb.net/?retryWrites=true&w=majority"
const DAO =new MongoDAO(URL)
console.log(DAO)