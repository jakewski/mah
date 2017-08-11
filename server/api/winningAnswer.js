const router = require('express').Router()
const { WinningAnswer } = require('../db/models')
const { Meme } = require('../db/models')

router.get('/', (req, res, next) => {
  WinningAnswer.findAll({
    include: [
        Meme
    ]
})
    .then(answer => res.json(answer))
    .catch(next);
});

module.exports = router;
