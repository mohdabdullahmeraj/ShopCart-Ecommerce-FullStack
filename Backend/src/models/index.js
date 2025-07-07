const Category = require('./category')
const Product = require('./product')

Category.hasMany(Product, {foreignKey: 'categoryId'})
Product.belongsTo(Category, {foreignKey: 'categoryId'})

Category.hasMany(Category, {foreignKey: 'parentId'})
Category.belongsTo(Category, {foreignKey: 'parentId'})

module.exports = {
    Category,
    Product
}