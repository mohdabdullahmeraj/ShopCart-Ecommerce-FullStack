const express = require('express')
const { createCategoryValidator } = require('../../middlewares/category_middleware')
const { CategoryController } = require('../../controllers')
const { verifyToken } = require('../../middlewares/auth_middleware')
const { createCategory, getCategories, getCategory, deleteCategory, getProductsByCategory, getCategoryTree, getLeafCategories } = CategoryController

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/",createCategoryValidator, verifyToken, createCategory)
categoryRouter.get("/tree", getCategoryTree)
categoryRouter.get("/leaf", getLeafCategories);
categoryRouter.get("/:id", getCategory)
categoryRouter.delete("/:id", verifyToken, deleteCategory)
categoryRouter.get("/:id/products", getProductsByCategory)


module.exports = categoryRouter