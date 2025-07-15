const CategoryRepository = require("./category_repository");
const FakeStoreRepository = require("./fake_store_repository");
const ProductRepository = require("./product_repository");
const AdminRepository = require("./admin_repository")
const UserRepository = require("./user_repository");
const CartRepository = require("./cart_repository");
const CartItemRepository = require("./cart_item_repository");

module.exports = {
    CategoryRepository, 
    ProductRepository, 
    FakeStoreRepository,
    AdminRepository,
    UserRepository,
    CartRepository,
    CartItemRepository
}