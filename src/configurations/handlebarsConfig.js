import handlebars from 'express-handlebars';

export function handleConfig(app){
    console.log(app.set)
    app.set('views', 'views')
    app.engine('handlebars', handlebars.engine())
    app.set('view engine', 'handlebars')
}