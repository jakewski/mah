const Meme = require('./meme')
const UserFavorite = require('./userFavorite')

UserFavorite.belongsTo(Meme)

module.exports = { UserFavorite, Meme }
