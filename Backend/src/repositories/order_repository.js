const Order = require("../models/order")
const OrderItem = require("../models/orderItem")
const Product = require("../models/product")
const ProductImage = require("../models/productImage")

class OrderRepository{
    createOrder = async(userId, totalAmount, paymentStatus, deliveryStatus) => {
        try{
            const response = await Order.create({
                userId,
                totalAmount,
                paymentStatus,
                deliveryStatus,
            })

            return response
        }catch(err){
            console.log(err);
            throw err            
        }
    }

    createOrderItems = async(orderItems) =>{
        try{
            const response = await OrderItem.bulkCreate(orderItems)
            return response

        }catch(err){
            console.log(err);
            throw err
        }

    }

    getOrdersByUser = async(userId) => {
        try{
            const response = await Order.findAll({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: OrderItem,
                        include: [Product]
                    }
                ]
            })

            return response
        }catch(err){
            console.log(err);
            throw err
        }
    }

    getOrderById = async(orderId) => {
        try{
            const response = await Order.findOne({
                where: {
                    id: orderId,
                },
                include: [
                    {
                        model: OrderItem,
                        include: [Product]
                    }
                ]  
            })
            return response
        }catch(err){
            console.log(err);
            throw err
        }
    }

    getAllOrders = async() => {
        try{
            const response = await Order.findAll()
            return response
        }catch(err){
            console.log(err);
            throw err
            
        }
    }
}

module.exports = OrderRepository