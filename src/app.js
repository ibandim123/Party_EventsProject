const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const app = express();



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs'); // Dinamic page HTML
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser('side'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))

consign({cwd:'src'})
.include('models')
.then('controllers')
.then('routes')
.into(app)
;

//Listen Door
app.listen(3000, ()=>{
    console.log('App no ar!')
})

