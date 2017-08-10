const Meme = require('./meme')
const UserFavorite = require('./userFavorite')
const Category = require('./category')
const WinningAnswer = require('./winningAnswer')

UserFavorite.belongsTo(Meme)
WinningAnswer.belongsTo(Meme)

module.exports = { UserFavorite, Meme, Category, WinningAnswer }
