const Admin = require('./admin')
const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const ProductImage = require('./productImage')
const Review = require('./review')
const Cart = require('./cart')
const CartItem = require('./cartItem')
const Order = require('./order')
const OrderItem = require('./orderItem')

Category.hasMany(Product, {foreignKey: 'categoryId'})
Product.belongsTo(Category, {foreignKey: 'categoryId'})

// Category.hasMany(Category, {as:'children', foreignKey: 'parentId'})
// Category.belongsTo(Category, {as: 'parent',foreignKey: 'parentId'})

Product.hasMany(ProductImage, {foreignKey: 'productId', as: 'images'})
ProductImage.belongsTo(Product, {foreignKey: 'productId'})

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' })
Review.belongsTo(Product, { foreignKey: 'productId' })

User.hasOne(Cart, {foreignKey: 'userId'})
Cart.belongsTo(User, {foreignKey: 'userId'})

Cart.hasMany(CartItem, {foreignKey: 'cartId'})
CartItem.belongsTo(Cart, {foreignKey: 'cartId'})
CartItem.belongsTo(Product, {foreignKey: 'productId'})

Order.hasMany(OrderItem, {foreignKey: 'orderId'})
OrderItem.belongsTo(Order, {foreignKey: 'orderId'})
OrderItem.belongsTo(Product, {foreignKey: 'productId'})

module.exports = {
    Category,
    Product,
    ProductImage,
    Admin,
    Review,
    User, 
    Cart,
    CartItem,
    Order,
    OrderItem
}