const CartItem = require("../models/cartItem");
const Product = require("../models/product");

class CartItemRepository{
    addOrUpdateCartItem = async(cartId, productId, quantity) => {
        try{
            const existingItem = await CartItem.findOne({
                where: { 
                    cartId: cartId,
                    productId: productId, 
                }
            })

            if(existingItem){
                existingItem.quantity += quantity
                await existingItem.save()
                return existingItem
            }

            const newItem = await CartItem.create({
                cartId,
                productId,
                quantity
            })
            
            return newItem

        }catch(err){
            console.log(err);
            throw err
            
        }
    }

    removeCartItem = async(cartItemId) => {
        try{
            const response = await CartItem.destroy({
                where: {
                    id: cartItemId
                }
            })

            return response

        }catch(err){
            console.log(err);
            throw err
        }
    }

    clearCart = async(cartId) => {
        try{
            const response = await CartItem.destroy({
                where: {
                    cartId: cartId
                }
            })

            return response

        }catch(err){
            console.log(err);
            throw err
        }
    }
    
    updateCartItemQuantity = async(cartItemId, newQuantity) => {
        try{
            if (newQuantity <= 0) {
                await this.removeCartItem(cartItemId);
                return null;
            }

            const item = await CartItem.findByPk(cartItemId);
            if (!item) throw new Error('Cart item not found');

            item.quantity = newQuantity;
            await item.save();
            return item;

        }catch(err){
            console.log(err);
            throw err
        }
    }

    getCartItems = async(cartId) => {
        try{
            const response = await CartItem.findAll({
                where: {
                    cartId: cartId
                },
                include: [Product]  
            })

            return response
            
        }catch(err){
            console.log(err);
            throw err
        }
    }
}

module.exports = CartItemRepository