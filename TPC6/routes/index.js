var express = require('express');
var router = express.Router();
var People = require('../controllers/person');

/* GET home page. */
router.get('/people', function(req, res) {
  People.getAllPeople()
    .then(people => {
      res.status(200).json(people)
    })
    .catch(err => {
      res.status(501).json({erro: err})
    })
});

router.get('/people/:idPeople', function(req, res) {
  People.getPeople(req.params.idPeople)
    .then(person => {
      res.json(person)
    })
    .catch(err => {
      res.status(502).json({erro: err})
    })
});

router.post('/people', (req, res) => {
  People.addPeople(req.body)
    .then(person => {
      res.status(201).json(person)
    })
    .catch(err => {
      res.status(500).json({ erro: err })
    })
})

router.put('/people/:idPeople', (req, res) => {
  People.updatePeople(req.body)
    .then(person => {
      res.json(person)
    })
    .catch(err => {
      res.status(504).json({ erro: err })
    })
})


router.delete('/people/:idPeople', function(req, res) {
  People.deletePeople(req.params.idPeople)
    .then(person => {
      res.json(person)
    })
    .catch(err => {
      res.status(505).json({erro: err})
    })
});

module.exports = router;