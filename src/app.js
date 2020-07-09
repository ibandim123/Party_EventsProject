const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');
const app = express();



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs'); // Dinamic page HTML
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser('side'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


consign({cwd:'src'})
.include('models')
.then('controllers')
.then('routes')
.into(app)
;
//middleware de tratamento de erros
app.use(error.notFound);
app.use(error.serverError);
//Listen Door
app.listen(3000, ()=>{
    console.log('App no ar!')
})

