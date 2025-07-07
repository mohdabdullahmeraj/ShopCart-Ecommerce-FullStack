const Sequelize = require('sequelize')
const db = require('../config/db_config')
const Product = require('./product')

const Category = db.define('Category',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,        
    }
})

Category.hasMany(Category, {
    as: 'children',
    foreignKey: 'parentId',
});

Category.belongsTo(Category, {
    as: 'parent',
    foreignKey: 'parentId',
});

module.exports = Category