const { badRequest } = require("../errors/bad_request_error")
const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class OrderService{
    constructor(orderRepository, productRepository, cartRepository, cartItemRepository){
        this.orderRepository = orderRepository
        this.productRepository = productRepository
        this.cartRepository = cartRepository
        this.cartItemRepository = cartItemRepository
    }

    createOrder = async(userId, paymentStatus, deliveryStatus) => {
        try{
            const cart = await this.cartRepository.getCartWithItems(userId)
            if(!cart){ 
                console.log(`OrderService: Cart of ${userId} not found`)
                throw new notFound("Cart", "userId", userId)
            }

            const cartItems = await this.cartItemRepository.getCartItems(cart.id)
            if(!cartItems || cartItems.length === 0){ 
                console.log(`OrderService: Cart of ${userId} not found`)
                throw new badRequest("Cart is empty")
            }

            let totalAmount = 0
            const orderItems = []

            for( const item of cartItems){
                const product = await this.productRepository.getProduct(item.productId)
                if(!product){
                    console.log(`OrderService: Product ${product.id} not found`)
                    throw new notFound("Product", "id", product.id)
                }

                const subTotal = product.price * item.quantity
                totalAmount += subTotal

                orderItems.push({
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price,
                })
            }

            const order = await this.orderRepository.createOrder(userId, totalAmount, paymentStatus, deliveryStatus)

            const finalOrderItems = orderItems.map(item => ({
                ...item,
                orderId: order.id
            }))

            await this.orderRepository.createOrderItems(finalOrderItems)
            await this.cartItemRepository.clearCart(cart.id)

            return await this.orderRepository.getOrderById(order.id)

        }catch(err){
        console.log("OrderService: ", err)
            if (["NotFoundError", "BadRequestError"].includes(err.name)) {
                throw err
            }
            throw new internalServerError()
        }
    }

    getOrdersByUser = async(userId) => {
        try{
            const response = await this.orderRepository.getOrdersByUser(userId)
            return response
        }catch(err){
            console.log("OrderService: ",err)
            throw new internalServerError()
        }
    }

    getOrderById = async(orderId) => {
        try{
            const response = await this.orderRepository.getOrderById(orderId)
            if (!response) {
                console.log(`OrderService: Order ${orderId} not found`)
                throw new notFound("Order", "id", orderId)
            }
            return response

        }catch(err){
            if(err.name == "NotFoundError"){
                throw err
            }

            console.log("OrderService: ",err)
            throw new internalServerError()
        }
    }

    getAllOrders = async() => {
        try{
            const response = await this.orderRepository.getAllOrders()
            return response

        }catch(err){
            console.log("OrderService: ",err)
            throw new internalServerError()
        }
    }

}

module.exports = OrderService