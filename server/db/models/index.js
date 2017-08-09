const Meme = require('./meme')
const UserFavorite = require('./userFavorite')
const Category = require('./category')

UserFavorite.belongsTo(Meme)

module.exports = { UserFavorite, Meme, Category }
