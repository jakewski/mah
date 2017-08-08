const router = require('express').Router()
const { Meme } = require('../db/models')

router.get('/', (req, res, next) => {
  Meme.findAll()
    .then(memes => res.json(memes))
    .catch(next);
});

module.exports = router
