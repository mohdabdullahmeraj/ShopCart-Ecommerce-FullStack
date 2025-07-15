const { badRequest } = require("../errors/bad_request_error")
const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class CartService{

    constructor (productRepository, cartRepository, cartItemRepository){
        this.productRepository = productRepository
        this.cartRepository = cartRepository
        this.cartItemRepository = cartItemRepository
    }

    getOrCreateCart = async(userId) => {
        try{
            const cart = await this.cartRepository.getCartByUserId(userId)
            if(!cart){ 
                await this.cartRepository.createCartForUser(userId)
            }
            return cart 

        }catch(err){
            console.log("CartService: ",err)
            throw new internalServerError()
        }
    }

    addToCart = async(userId, productId, quantity) => {
        try {
            if (quantity <= 0) {
                throw new badRequest("Quantity must be greater than 0")
            }

            const product = await this.productRepository.getProduct(productId)
            if (!product) {
                console.log(`CartService: Product ${productId} not found`)
                throw new notFound("Product", "id", productId)
            }

            const cart = await this.getOrCreateCart(userId)
            const item = await this.cartItemRepository.addOrUpdateCartItem(cart.id, productId, quantity)

            return item

        }catch(err){
            if(err.name == "NotFoundError" || err.name == "BadRequestError"){
                throw err
            }
            console.log("CartService: ",err)
            throw new internalServerError()
        }
    }

    removeFromCart = async(cartItemId) => {
        try{
            const deleted = await this.cartItemRepository.removeCartItem(cartItemId)
            if (!deleted){
                console.log(`CartService: CartItem ${cartItemId} not found`)
                throw new notFound("CartItem", "id", cartItemId)
            }
            return { message: "Item removed from cart" }
        
        }catch(err){
            if(err.name == "NotFoundError"){
                throw err
            }
            console.log("CartService: ",err)
            throw new internalServerError()
        }
    }

    updateQuantity = async(cartItemId, quantity) => {
        try{
            if (quantity < 0) throw new badRequest("Quantity must not be negative")

            const updatedItem = await this.cartItemRepository.updateCartItemQuantity(cartItemId, quantity)
            if (!updatedItem) {
                return { message: "Item removed due to 0 quantity" }
            }

            return updatedItem
        }catch(err){
            if(err.name == "BadRequestError"){
                throw err
            }
            console.log("CartService: ",err)
            throw new internalServerError()
        }
    }

    clearUserCart = async(userId) => {
        try{
            const cart = await this.cartRepository.getCartByUserId(userId)
            if (!cart) {
                console.log("CartService: Cart not found for user", userId)
                throw new notFound("Cart", "userId", userId)
            }

            await this.cartItemRepository.clearCart(cart.id)
            return { message: "Cart cleared" }

        }catch(err){
            if (err.name === "NotFoundError") {
                throw err
            }
            console.log("CartService: getUserCart", err)
            throw new internalServerError()
        }
    }

    getUserCart = async(userId) => {
        try{
            const cart = await this.cartRepository.getCartWithItems(userId)
            if (!cart) {
                console.log("CartService: Cart not found for user", userId)
                throw new notFound("Cart", "userId", userId)
            }
            return cart

        }catch(err){    
            if (err.name === "NotFoundError") {
                throw err
            }
            console.log("CartService: getUserCart", err)
            throw new internalServerError()
        }
    }
}

module.exports = CartService