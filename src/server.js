const http = require('http');
const { response } = require('express');
const request = require('request')

const server = http.createServer((req,res) =>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    //Rotas
    if (request.url === '/'){
        res.write('<h1>Página Principal</h1>')
    }else if(request.url === '/bemvindo'){
        res.write('<h1>Bem Vindo :) </h1>')
    }else{
        res.write('<h1>Página não encontrada:(</h1>')
    }
    res.write('<h1>Hello World</h1>');
    res.end();

});
server.listen(3001)