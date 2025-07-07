const Category = require('./category')
const Product = require('./product')

Category.hasMany(Product, {foreignKey: 'categoryId'})
Product.belongsTo(Category, {foreignKey: 'categoryId'})

// Category.hasMany(Category, {as:'children', foreignKey: 'parentId'})
// Category.belongsTo(Category, {as: 'parent',foreignKey: 'parentId'})

module.exports = {
    Category,
    Product
}