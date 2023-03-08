var fs = require('fs')
var http = require('http');
var axios = require('axios');
var utils = require('./utils');
var mypages = require('./mypages')

http.createServer(function (req,res)
{
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    
    if(req.url == '/'){
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        res.end(mypages.indexPage())
    }else if(req.url == '/pessoas'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoas))
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
    }else if(req.url.match(/\/pessoas\/\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9) )
        .then(function(resp){
            var pessoa = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end(mypages.genPersonPage(pessoa,d))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }else if(req.url.match(/\/pessoas\?/)){
        axios.get('http://localhost:3000/pessoas' + req.url.substring(8) )
        .then(function(resp){
            var pessoa = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end(mypages.genMainPage(pessoa))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }else if(req.url == '/sexos'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var dist = utils.genSexDist(pessoas)
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.genDistPage(dist,'sexo'))
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
    }else if(req.url == '/desportos'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var dist = utils.genDespDist(pessoas)
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.genDistPage(dist,'desporto'))
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
    }else if(req.url == '/profissoes'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var dist = utils.genProfDist(pessoas)
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.genDistPage(dist,'profissao'))
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
    }else if(req.url.match(/[a-zA-Z]*w3\.css/)){
        fs.readFile("w3.css", function(err, dados){
            if(err){
                res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na leitura do ficheiro' +  err + '<p>')
            }
            else{
                res.writeHead(200, {'Content-type': 'text/css'});
                res.end(dados)
            }
        })
    }else{
        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'});
        res.end('<p> Operação não suportada' +  req.url + '<p>')
    }

}).listen(7777);


console.log("Servidor à escuta na porta 7777...");