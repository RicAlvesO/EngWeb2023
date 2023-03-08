exports.genMainPage = function(lista){
    var pagHTML = `
        <DOCTYPE html>
            <head>
                <meta charset"UTF-8"/>
                <title> About people </title>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">

                <header class="w3-container w3-light-blue w3-center">
                <h1>Lista de pessoas na Base de Dados (${lista.length})</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-centered w3-hoverable w3-large">
                    <tr>
                        <th> Id </th>
                        <th> Nome </th>
                        <th> Idade </th>
                        <th> Sexo </th>
                        <th> Cidade </th>
                    </tr>`

    for(let i=0;i<lista.length;i++)
    {
        pagHTML += `
                    <tr>
                        <td> ${lista[i].id} </td>
                        <td> 
                            <a href="http://localhost:7777/pessoas/${lista[i].id}">${lista[i].nome}</a> 
                        </td> 
                        <td> ${lista[i].idade} </td>
                        <td> ${lista[i].sexo} </td>
                        <td> ${lista[i].morada.cidade} </td>
                    </tr>
        `
    }

    pagHTML += `
                </table>
            </div>

            <footer class="w3-container w3-light-blue w3-center">
              <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
            </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML;
}


exports.genPersonPage = function(p){
    var pagHTML = `
        <DOCTYPE html>
            <head>
                <meta charset"UTF-8"/>
                <title> Indice </title>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">

                <header class="w3-container w3-light-blue w3-center">
                <h1>${p.nome}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable w3-large">
                    <tr>
                        <th> Informação </th>
                    </tr>
                    <tr>
                        <td>Id: ${p.id}</td>
                    </tr><tr>
                        <td>Idade: ${p.idade}</td>
                    </tr><tr>
                        <td>Sexo: ${p.sexo}</td>
                    </tr><tr>
                        <td>Cidade: ${p.morada.cidade}</td>
                    </tr><tr>
                        <td>Código Postal: ${p.morada.codPostal}</td>
                    </tr><tr>
                        <td>Profissão: ${p.profissao}</td>
                    </tr>
                </table>
            </div>

            <footer class="w3-container w3-light-blue w3-center">
              <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
            </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML;
}

exports.indexPage = function(){
    var pagHTML = `
        <DOCTYPE html>
            <head>
                <meta charset"UTF-8"/>
                <title> Indice </title>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">

                <header class="w3-container w3-light-blue w3-center">
                <h1>Indice</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-centered w3-hoverable w3-large">
                    <tr>
                        <th> Links Relevantes </th>
                    </tr>
                    <tr>
                        <td><a href="http://localhost:7777/pessoas">Pessoas</a></td>
                    </tr><tr>
                        <td><a href="http://localhost:7777/pessoas?_sort=nome">Pessoas Ordenadas Por Nome</a></td>
                    </tr><tr>
                        <td><a href="http://localhost:7777/sexos">Distribuição de Sexo</a></td>
                    </tr><tr>
                        <td><a href="http://localhost:7777/desportos">Distribuição por Desporto</a></td>
                    </tr><tr>
                        <td><a href="http://localhost:7777/profissoes">Distribuição por Profissão</a></td>
                    </tr>

                </table>
            </div>

            <footer class="w3-container w3-light-blue w3-center">
              <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
            </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML;
}

exports.genDistPage = function (args,type) {
    var items = Object.keys(args).map(function (key) {
        return [key, args[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });

    if (type == "profissao") {
        items = items.slice(0, 10);
    }

    var type = type;
    var pagHTML = `
        <DOCTYPE html>
            <head>
                <meta charset"UTF-8"/>
                <title> Distribution </title>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">

                <header class="w3-container w3-light-blue w3-center">
                <h1>Distribuicao por ${type}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all w3-centered w3-hoverable w3-large">
                    <tr>
                        <th> Valor </th>
                        <th> Contagem </th>
                    </tr>`


    for (i = 0; i < items.length; i++) {
        pagHTML += `
                    <tr>
                        <td> ${items[i][0]} </td>
                        <td> 
                            <a href="http://localhost:7777/pessoas?${type}=${items[i][0]}">${items[i][1]}</a> 
                        </td> 
                    </tr>
        `
    }

    pagHTML += `
                </table>
            </div>

            <footer class="w3-container w3-light-blue w3-center">
              <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
            </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML;
}