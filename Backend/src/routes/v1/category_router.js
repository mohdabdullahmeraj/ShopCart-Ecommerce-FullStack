const express = require('express')
const { createCategory, getCategories, getCategory, deleteCategory } = require('../../controllers/category_controller')
const { createCategoryValidator } = require('../../middlewares/category_middleware')

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/",createCategoryValidator, createCategory)
categoryRouter.get("/:id", getCategory)
categoryRouter.delete("/:id", deleteCategory)


module.exports = categoryRouter