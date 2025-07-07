const express = require('express')
const { createCategoryValidator } = require('../../middlewares/category_middleware')
const { CategoryController } = require('../../controllers')
const { createCategory, getCategories, getCategory, deleteCategory, getProductsByCategory, getCategoryTree, getLeafCategories } = CategoryController

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/",createCategoryValidator, createCategory)
categoryRouter.get("/tree", getCategoryTree)
categoryRouter.get("/leaf", getLeafCategories);
categoryRouter.get("/:id", getCategory)
categoryRouter.delete("/:id", deleteCategory)
categoryRouter.get("/:id/products", getProductsByCategory)


module.exports = categoryRouter