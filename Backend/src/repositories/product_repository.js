const { where, Op } = require("sequelize");
const Product = require("../models/product");

class ProductRepository{
    getProducts = async (limit, offset, min_price, max_price, category, search, sortBy, sortOrder) => {
        try{
            const filter = {}
            if(limit){
                filter.limit = limit
            }
            if(offset){
                filter.offset = offset
            }
            const minValue = min_price ? min_price : Number.MIN_SAFE_INTEGER
            const maxValue = max_price ? max_price : Number.MAX_SAFE_INTEGER
            
            const where = {}
            if(category){
                where.categoryId = category
            }

            if(search){
                where.title = {[Op.like]: `%${search}%`} 
            }

            const response = await Product.findAll({
                where: {
                    price: {
                        [Op.between]: [minValue, maxValue]
                    },
                    ...where
                },
                ...filter,
                order: [[sortBy, sortOrder]] 
            })
            return response

        }catch(err){
            console.log(err)
            throw err
        }
    }

    getProduct = async(id) => {
        try{

            const response = await Product.findByPk(id)
            return response

        }catch(err){
            console.log(err)
            throw err
        }
    }

    createProduct = async(title, description, price,categoryId, image) => {
        try{

            const response = await Product.create({
                title,
                description,
                price,
                categoryId,
                image
            })

            return response

        }catch(err){
            console.log(err)
            throw err
        }

    }

    deleteProduct = async(productId) => {
        try{

            const response = await Product.destroy({
                where: {
                    id: productId
                }
            })
            return response

        }catch(err){
            console.log(err)
            throw err
        }
    }

    getProductsByCategory = async(categoryId) => {
        try{

            const response = await Product.findAll({
                where: {
                    categoryId: categoryId
                }
            })
            return response

        }catch(err){
            console.log(err)
            throw err
        }
    }
}

module.exports = ProductRepository