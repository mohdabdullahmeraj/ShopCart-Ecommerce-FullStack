const Category = require('./category')
const Product = require('./product')
const ProductImage = require('./productImage')

Category.hasMany(Product, {foreignKey: 'categoryId'})
Product.belongsTo(Category, {foreignKey: 'categoryId'})

// Category.hasMany(Category, {as:'children', foreignKey: 'parentId'})
// Category.belongsTo(Category, {as: 'parent',foreignKey: 'parentId'})

Product.hasMany(ProductImage, {foreignKey: 'productId', as: 'images'})
ProductImage.belongsTo(Product, {foreignKey: 'productId'})

module.exports = {
    Category,
    Product,
    ProductImage
}