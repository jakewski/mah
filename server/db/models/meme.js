const Sequelize = require('sequelize')
const db = require('../db')

const Meme = db.define('meme', {
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING
  },
})

Meme.prototype.getRandomMeme = () => {
  return Meme.findAll()
    .then(memes => memes[Math.floor(Math.random() * memes.length)])
    .catch(next);
}

module.exports = Meme
