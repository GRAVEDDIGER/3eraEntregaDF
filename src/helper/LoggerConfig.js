import winston from "winston";
import path from "path"
import fs from "fs";
import  Colors  from "colors";
const logsDir="logs"
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)
export const logger = {
    debug: winston.createLogger({
            level:"debug",
            format:winston.format.combine(winston.format.timestamp(),winston.format.label({label:"e-Commerce Backend Debuger"}),winston.format.prettyPrint()),
            transports:[new winston.transports.Console({format:winston.format.combine(winston.format.colorize(),winston.format.simple())}),new winston.transports.File({filename:path.join(logsDir,"/debug.log")})]

}),
info: winston.createLogger({
    level:"info",
    format:winston.format.combine(winston.format.timestamp(),winston.format.label({label:"e-Commerce Backend Debuger"}),winston.format.prettyPrint()),
    transports:[new winston.transports.Console({format:winston.format.combine(winston.format.colorize(),winston.format.simple())}),new winston.transports.File({filename:path.join(logsDir,"/info.log")})]

}),
warning: winston.createLogger({
    level:"warning",
    format:winston.format.combine(winston.format.timestamp(),winston.format.label({label:"e-Commerce Backend Debuger"}),winston.format.prettyPrint()),
    transports:[new winston.transports.Console({format:winston.format.combine(winston.format.colorize(),winston.format.simple())}),new winston.transports.File({filename:path.join(logsDir,"/warning.log")})]

}),
error: winston.createLogger({
    level:"error",
    format:winston.format.combine(winston.format.timestamp(),winston.format.label({label:"e-Commerce Backend Debuger"}),winston.format.prettyPrint()),
    transports:[new winston.transports.Console({format:winston.format.combine(winston.format.colorize(),winston.format.simple())}),new winston.transports.File({filename:path.join(logsDir,"/error.log")})]

})
}
export default logger