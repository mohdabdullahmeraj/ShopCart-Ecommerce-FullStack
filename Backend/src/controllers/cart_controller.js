const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const { errorResponse } = require("../utils/error_response")
const CartService = require("../services/cart_service")
const ProductRepository = require("../repositories/product_repository")
const CartRepository = require("../repositories/cart_repository")
const CartItemRepository = require("../repositories/cart_item_repository")

const cartService = new CartService(new ProductRepository(), new CartRepository(), new CartItemRepository())

const getCart = async(req, res) => {
    try{
        const response = await cartService.getUserCart(req.user.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched cart",
                data: response
            })

    }catch(err){
        console.log("Cart Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const addToCart = async(req, res) => {
    try{
        const response = await cartService.addToCart(req.user.id, req.body.productId, req.body.quantity)
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: "Successfully added to cart",
                data: response
            })

    }catch(err){
        console.log("Cart Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const removeFromCart = async(req, res) => {
    try{
        const response = await cartService.removeFromCart(req.body.cartItemId)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully removed from cart",
                data: response
            })

    }catch(err){
        console.log("Cart Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const updateQuantity = async(req, res) => {
    try{
        const response = await cartService.updateQuantity(req.body.cartItemId, req.body.quantity)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully updated in cart",
                data: response
            })

    }catch(err){
        console.log("Cart Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const clearCart = async(req, res) => {
    try{
        const response = await cartService.clearUserCart(req.user.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully cleared cart",
                data: response
            })

    }catch(err){
        console.log("Cart Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    clearCart,
    updateQuantity
}

