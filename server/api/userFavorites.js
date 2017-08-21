const router = require('express').Router()
const { UserFavorite } = require('../db/models')

router.get('/', (req, res, next) => {
  UserFavorite.findAll()
  .then(userFavorites => res.json(userFavorites))
  .catch(next);
});

router.post('/', (req, res, next) => {
  const { name, memeId, text } = req.body
  UserFavorite.create({ name, memeId, text })
  .then(userFav => res.status(201).send(userFav))
  .catch(next)
})

router.get('/:name', (req, res, next) => {
  UserFavorite.findAll({where: {name: req.params.name}})
  .then(favsFound => res.json(favsFound))
  .catch(next)
})

module.exports = router
