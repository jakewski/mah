const Sequelize = require('sequelize')
const db = require('../db')

const WinningAnswer = db.define('winningAnswer', {
  memeUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  topText: {
    type: Sequelize.STRING,
  },
  topXcoord: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  topYcoord: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  topFontSize: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bottomText: {
    type: Sequelize.STRING,
  },
  bottomXcoord: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bottomYcoord: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bottomFontSize: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = WinningAnswer
