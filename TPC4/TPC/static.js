/*
    Module Static - to serve static resources in public folder
    Exports: 
        Bool staticResource(request) - tells if someone is asking a static resource
        Data serveStaticResource(req, res) - returns the resource
*/

var fs = require('fs')

function staticResource(request){
    var files = fs.readdirSync('public')
    var partes = request.url.split('/')
    var file = partes[partes.length -1 ]
    if(files.includes(file)){
        return true
    }
    return false
}

exports.staticResource = staticResource

async function serveStaticResource(req, res){
    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){
            //console.log('Erro: ficheiro não encontrado ' + erro)
            res.writeHead(404,{'Content-Type': 'error'})
            res.write(erro)
        }
        else{
            extension = file.split('.')[1]
            content={}
            switch(extension){
                //MAIN FILE TYPES
                case 'html':
                    content={'Content-Type': 'text/html'}
                    break
                case 'css':
                    content={'Content-Type': 'text/css'}
                    break
                case 'js':
                    content={ 'Content-Type': 'text/javascript' }
                    break
                //IMAGES
                case 'ico':
                    content={'Content-Type': 'image/x-icon'}
                    break
                case 'png':
                    content={'Content-Type': 'image/png'}
                    break
                case 'jpg':
                    content={'Content-Type': 'image/jpg'}
                    break
                case 'gif':
                    content={'Content-Type': 'image/gif'}
                    break
                case 'webp':
                    content={'Content-Type': 'image/webp'}
                    break
                //OTHERS
                case 'svg':
                    content={'Content-Type': 'image/svg+xml'}
                    break
                case 'xml':
                    content={'Content-Type': 'application/xml'}
                    break
                case 'json':
                    content={'Content-Type': 'application/json'}
                    break
                case 'pdf':
                    content={'Content-Type': 'application/pdf'}
                    break
                default:
                    content={'Content-Type': 'text/plain'}
                    break
            }
            res.writeHead(200, content)
            res.write(dados)
            res.end()
        }
    })
}

exports.serveStaticResource = serveStaticResource
