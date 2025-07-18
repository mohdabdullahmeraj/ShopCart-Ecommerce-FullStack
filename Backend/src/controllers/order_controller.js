const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const { errorResponse } = require("../utils/error_response")
const OrderService = require("../services/order_service")
const OrderRepository = require("../repositories/order_repository")
const ProductRepository = require("../repositories/product_repository")
const CartRepository = require("../repositories/cart_repository")
const CartItemRepository = require("../repositories/cart_item_repository")

const orderService = new OrderService(new OrderRepository(), new ProductRepository(), new CartRepository(), new CartItemRepository())



const createOrder = async(req, res) => {
    try{
        const { paymentStatus = "Pending", deliveryStatus = "Processing" } = req.body || {};

        const response = await orderService.createOrder(req.user.id, paymentStatus, deliveryStatus)
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                error: {},
                message: "Successfully created Order",
                data: response
            })
    }catch(err){
        console.log("Order Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const getOrdersByUser = async(req,res) => {
    try{
        const response = await orderService.getOrdersByUser(req.user.id)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched orders by user",
                data: response
            })
    }catch(err){
        console.log("Order Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const getOrderById = async(req, res) => {
    try{
        const response = await orderService.getOrderById(req.params.orderId)
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched Order by Id",
                data: response
            })
    }catch(err){
        console.log("Order Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

const getAllOrders = async(req, res) => {
    try{
        const response = await orderService.getAllOrders()
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                error: {},
                message: "Successfully fetched all Orders",
                data: response
            })
    }catch(err){
        console.log("Order Controller: Something happened", err)
        return res
            .status(err.statusCode)
            .json(errorResponse(err.reason, err))
    }
}

module.exports = {
    createOrder, 
    getOrdersByUser,
    getOrderById,
    getAllOrders
}
