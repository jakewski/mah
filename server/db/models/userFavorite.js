const Sequelize = require('sequelize')
const db = require('../db')

const UserFavorite = db.define('userFavorite', {
  name: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = UserFavorite
