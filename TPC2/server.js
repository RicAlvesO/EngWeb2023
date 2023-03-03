
var http = require('http');
var url = require('url');
var fs = require('fs')

var myServer = http.createServer(function (req,res)
{
    var request_name = url.parse(req.url, true).pathname;
    var city_code = Number(request_name.substring(2));

    if (!request_name.startsWith("/c") || isNaN(city_code) || city_code > 100 || city_code < 0){
        request_name = "mapa.html";
    }else{request_name = 'cidades'+request_name+'.html'} 

    fs.readFile(request_name, function(err,data){
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        
        if (err)
        {
            res.write("Error while reading file :: " +  err);
        }
        else {
            res.write(data)
        }

        res.end();
        
    })

})

myServer.listen(9667);
console.log("Servidor à escuta na porta 9667...");