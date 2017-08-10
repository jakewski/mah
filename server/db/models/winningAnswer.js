const Sequelize = require('sequelize')
const db = require('../db')

const WinningAnswer = db.define('winningAnswer', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = WinningAnswer
