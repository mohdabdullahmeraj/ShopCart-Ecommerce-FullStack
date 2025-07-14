const Sequelize = require('sequelize')
const db = require('../config/db_config')
const Product = require('./product')

const Review = db.define('Review', {
  user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  }
})

module.exports = Review
