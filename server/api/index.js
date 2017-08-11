const router = require('express').Router()
module.exports = router

router.use('/memes', require('./memes'))
router.use('/categories', require('./categories'))
router.use('/userFavorites', require('./userFavorites'))
router.use('/winningAnswers', require('./winningAnswer'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
