exports.genSexDist = function(pessoas){
    var dist = {}
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo in dist) {
            dist[pessoas[i].sexo] += 1
        } else {
            dist[pessoas[i].sexo] = 1
        }
    }
    
    return dist
}

exports.genDespDist = function (pessoas) {
    var dist = {}
    for (let i = 0; i < pessoas.length; i++) {
        var list=pessoas[i].desportos
        for (let j = 0; j < list.length; j++) {
            if (list[j] in dist) {
                dist[list[j]] += 1
            } else {
                dist[list[j]] = 1
            }
        }
    }
    return dist
}

exports.genProfDist = function (pessoas) {
    var dist = {}
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].profissao in dist) {
            dist[pessoas[i].profissao] += 1
        } else {
            dist[pessoas[i].profissao] = 1
        }
    }
    return dist
}