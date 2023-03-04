//IMPORTS
import Session from "express-session"
import passportConfigBuilder from "passport-fast-config"
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
import flash from "connect-flash"
import {UserSchema} from "../models/UserModel.js"
import morgan from "morgan"
import {morganWinston} from "../helper/CustomMorgan.js"
import {handleConfig} from "../configurations/handlebarsConfig.js"
import path from "path"
import passport from "passport"
// import {routes} from "../routes/routes.js"
import login from "../routes/login.js"
dotenv.config()
// SESSION
const store= MongoStore.create({mongoUrl:process.env.MONGOURL, ttl:600000})
const sessionMiddleware =Session({
store,
secret: 'C0>1NG S0M3TH1NG',
cookie: { maxAge: 600000 },
resave: false,
saveUninitialized: false
})
//MIDDLEWARE FUNCTION 
export const middleWareLoader =(express,app)=>{
    app.use(express.static(path.join("/src", 'public')))
    app.use(express.json())
    app.use(express.urlencoded({extends:false}))
    app.use(sessionMiddleware)
    const passportObject=passportConfigBuilder(UserSchema,"MONGO").buildLocalConfig()
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    app.use(morgan(morganWinston))
    app.use("/login",login)
    //app.use("/",routes)
    handleConfig(app)   
return passportObject
}