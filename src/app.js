const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookie = require('cookie')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const config = require('./config')
const error = require('./middlewares/error');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const store = new expressSession.MemoryStore();



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs'); // Dinamic page HTML
//app.use(express.static(path.join(__dirname,'public')));
//app.use(cookieParser('side'));
app.use(expressSession({
    store,
    name: config.sessionKey,
    secret: config.sessionSecret
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Verificador de regra
io.use((socket,next) =>{
    const cookieData = socket.request.headers.cookie;
    const cookieObj = cookie.parse(cookieData);//Gera um objeto com dados do cookie
    const  sessionHash = cookieObj[config.sessionKey] ||'';// Acessa o hash da sessão 
    const sessionID = sessionHash.split('.')[0].slice(2);
    store.all((err,sessions)=>{
        const currentSession = sessions[sessionID]; // referenciar a sessão ID
        if( err|| !currentSession){
            return next(new Error('Acesso Negado!'));
        }
        socket.handshake.session = currentSession;
        return next();
    })
})

consign({cwd:'src'})
.include('models')
.then('controllers')
.then('routes')
.then('events')
.into(app , io)
;
//middleware de tratamento de erros
app.use(error.notFound);
app.use(error.serverError);


//Listen Door
server.listen(3000, ()=>{

    console.log('App no ar!')
})

