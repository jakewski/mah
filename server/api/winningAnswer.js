const router = require('express').Router()
const { WinningAnswer } = require('../db/models')

router.get('/', (req, res, next) => {
  WinningAnswer.findAll()
    .then(answers => res.json(answers))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { topText, topXcoord, topYcoord, topFontSize,
    bottomText, bottomXcoord, bottomYcoord, bottomFontSize,
     memeUrl } = req.body

  WinningAnswer.create({ topText, topXcoord, topYcoord, topFontSize,
    bottomText, bottomXcoord, bottomYcoord, bottomFontSize,
     memeUrl })
  .then(answer => res.status(201).send(answer))
  .catch(next)
})

module.exports = router
