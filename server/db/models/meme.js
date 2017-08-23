const Sequelize = require('sequelize')
const db = require('../db')

const Meme = db.define('meme', {
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING
  },
  topText: {
    type: Sequelize.STRING
  },
  bottomText: {
    type: Sequelize.STRING
  }
})


module.exports = Meme
