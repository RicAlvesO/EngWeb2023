var People = require('../models/people')

// GET everyone
module.exports.getAllPeople = () => {
    return People.find()
        .then(data => {
            return data
        })
        .catch(erro => {
            return erro
        })

}

//GET specific person
module.exports.getPeople = id => {
    return People.findOne({ _id: id })
        .then(data => {
            return data
        })
        .catch(erro => {
            return erro
        })
}

//POST one person
module.exports.addPeople = a => {
    return People.collection.insertOne(a)
        .then(data => {
            return data
        })
        .catch(erro => {
            return erro
        })
}

//PUT (update) one person 
module.exports.updatePeople = a => {
    return People.updateOne({ _id: a._id }, a)
        .then(data => {
            return data
        })
        .catch(erro => {
            return erro
        })
}

//DELETE one person
module.exports.deletePeople = id => {
    return People.collection.deleteOne({ _id: id })
        .then(data => {
            return data
        })
        .catch(erro => {
            return erro
        })
}