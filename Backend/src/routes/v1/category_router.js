const express = require('express')
const { createCategory, getCategories, getCategory, deleteCategory, getProductsByCategory } = require('../../controllers/category_controller')
const { createCategoryValidator } = require('../../middlewares/category_middleware')

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/",createCategoryValidator, createCategory)
categoryRouter.get("/:id", getCategory)
categoryRouter.delete("/:id", deleteCategory)
categoryRouter.get("/:id/products", getProductsByCategory)


module.exports = categoryRouter