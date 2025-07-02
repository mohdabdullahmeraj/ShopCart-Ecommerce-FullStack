const { default: axios } = require("axios")

class FakeStoreRepository{
    getProducts = async () => {
        try{
    
            const response = await axios.get('https://fakestoreapi.com/products')
            return response.data
    
        }catch(err){
            console.log("Something happened", err)
        }
    }

    getProduct = async (id) => {
        try{
    
            const response = await axios.get('https://fakestoreapi.com/products/'+id)
            return response.data
    
        }catch(err){
            console.log("Something happened", err)
        }
    }

    createProduct = async(product) => {
        try{

            const response = await axios.post('https://fakestoreapi.com/products', product)
            return response.data

        }
        catch(err){
            console.log("Something happened", err)
        }
    }
    
}


module.exports = FakeStoreRepository