const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Category
