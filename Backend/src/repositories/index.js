const CategoryRepository = require("./category_repository");
const FakeStoreRepository = require("./fake_store_repository");
const ProductRepository = require("./product_repository");
const AdminRepository = require("./admin_repository")

module.exports = {
    CategoryRepository, 
    ProductRepository, 
    FakeStoreRepository,
    AdminRepository
}