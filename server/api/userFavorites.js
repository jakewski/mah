const router = require('express').Router()
const { UserFavorites } = require('../db/models')

router.get('/', (req, res, next) => {
  UserFavorites.findAll()
    .then(userFavorites => res.json(userFavorites))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { name, memeId } = req.body
  UserFavorites.create({ name, memeId})
  .then(userFav => res.status(201).send(userFav))
  .catch(next)
})

module.exports = router
