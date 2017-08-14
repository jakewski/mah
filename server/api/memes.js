const router = require('express').Router()
const { Meme } = require('../db/models')

router.get('/', (req, res, next) => {
  Meme.findAll()
    .then(memes => res.json(memes))
    .catch(next);
});

router.get('/random', (req, res, next) => {
  Meme.findAll()
    .then(memes => res.json(memes[Math.floor(Math.random() * memes.length)]))
    .catch(next);
})

router.post('/', (req, res, next) => {
  const { image, text } = req.body
  Meme.create({ image, text})
  .then(meme => res.status(201).send(meme))
  .catch(next)
})

module.exports = router
