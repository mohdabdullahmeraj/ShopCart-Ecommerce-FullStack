const express = require('express')
const { createCategoryValidator } = require('../../middlewares/category_middleware')
const { CategoryController } = require('../../controllers')
const { createCategory, getCategories, getCategory, deleteCategory, getProductsByCategory } = CategoryController

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/",createCategoryValidator, createCategory)
categoryRouter.get("/:id", getCategory)
categoryRouter.delete("/:id", deleteCategory)
categoryRouter.get("/:id/products", getProductsByCategory)


module.exports = categoryRouter