const express = require('express')
const { createCategoryValidator } = require('../../middlewares/category_middleware')
const { CategoryController } = require('../../controllers')
const { verifyToken } = require('../../middlewares/auth_middleware')
const { verifyRole } = require('../../middlewares/role_middleware')
const { createCategory, getCategories, getCategory, deleteCategory, getProductsByCategory, getCategoryTree, getLeafCategories } = CategoryController

const categoryRouter = express.Router()

categoryRouter.post("/",createCategoryValidator, verifyToken, verifyRole(['admin']), createCategory)
categoryRouter.delete("/:id", verifyToken, verifyRole(['admin']), deleteCategory)

categoryRouter.get("/", getCategories)
categoryRouter.get("/tree", getCategoryTree)
categoryRouter.get("/leaf", getLeafCategories);
categoryRouter.get("/:id", getCategory)
categoryRouter.get("/:id/products", getProductsByCategory)


module.exports = categoryRouter