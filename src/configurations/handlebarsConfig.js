import handlebars from 'express-handlebars';
import path from 'path';
const viewsPath=path.join("../","views")
export function handleConfig(app){
    console.log(viewsPath)
    app.set('views', './src/views')
    app.engine('handlebars', handlebars.engine())
    app.set('view engine', 'handlebars')
}