const router = require('express').Router()
const { Category } = require('../db/models')
const Sequelize = require('sequelize')
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

router.get('/random', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories[Math.floor(Math.random() * categories.length)]))
    .catch(next);
})

router.post('/', (req, res, next) => {
  const text = req.body.text
  Category.create({text})
    .then(category => res.status(201).send(category))
    .catch(next);
});

module.exports = router
