const { where } = require("sequelize");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");


class CartRepository{
    getCartByUserId = async(userId) => {
        try{
            const response = await Cart.findOne({
                where: {
                    userId: userId
                }
            })

            return response

        }catch(err){
            console.log(err)
            throw err
        }
    }

    createCartForUser = async(userId) => {
        try{
            const response = await Cart.create({
                userId,
            })

            return response

        }catch(err){
            console.log(err)
            throw err
        }
    }

    getCartWithItems = async(userId) => {
        try{
            const response = await Cart.findOne({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: CartItem,
                        include: [Product],
                    }
                ]
            })

            return response

        }catch(err){
            console.log(err);
            throw err
        }
    }

}

module.exports = CartRepository