const { where } = require("sequelize");
const Product = require("../models/product");

class ProductRepository{
    getProducts = async () => {
        try{

            const response = await Product.findAll()
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

    createProduct = async(title, description, price, image) => {
        try{

            const response = await Product.create({
                title,
                description,
                price,
                image
            })

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
}

module.exports = ProductRepository