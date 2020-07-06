const express = require('express');
const path = require('path');
const consign = require('consign');
const app = express();

//Middleware config 
//var.set('key', value) -- First show directory view's and
// the second is choose template engine

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs'); // Dinamic page HTML
app.use(express.static(path.join(__dirname,'public')));


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

