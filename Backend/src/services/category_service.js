const { badRequest } = require("../errors/bad_request_error")
const { internalServerError } = require("../errors/internal_server_error")
const { notFound } = require("../errors/not_found_error")

class CategoryService {
    constructor (repository, productRepository){
        this.repository = repository
        this.productRepository = productRepository
    }
    
    hasCircularReference = async(parentId, visitedIds = new Set()) => {
        while(parentId){
            if (visitedIds.has(parentId)) return true
            visitedIds.add(parentId)
            const parentCategory = await this.repository.getCategory(parentId)
            if(!parentCategory) break
            parentId = parentCategory.parentId
        }
        return false
    }

    createCategory = async(category) => {
        try{
            if(category.parentId){
                const parentCategory = await this.repository.getCategory(category.parentId)
                if(!parentCategory){
                    console.log("CategoryService: parentId not found");
                    throw new notFound("Category", "id", category.parentId);
                }
                
                if(await this.hasCircularReference(category.parentId)){
                    console.log("CategoryService: Circular parent reference detected");
                    throw new badRequest("Circular parent category reference");
                }
            }
            const response = await this.repository.createCategory(category.name, category.description, category.parentId)
            return response
    
        }catch(err){
            if(err.name == "NotFoundError"){
                throw err
            }
            console.log("CategoryService: ",err)
            throw new internalServerError()
        }
    }

    getCategories = async() => {
        try{
            const response = await this.repository.getCategories()
            return response
        }catch(err){
            console.log("CategoryService: ",err)
            throw new internalServerError()
        }
    }

    getCategory = async(categoryId) => {
        try{
            const response = await this.repository.getCategory(categoryId)
            if(!response) { 
                console.log("CategoryService: ", categoryId, "not found");
                throw new notFound("Category", "id", categoryId);
            }
            return response;
        }catch(err){
            if(err.name === "NotFoundError") {
                throw err;
            }
            console.log("CategoryService: ",err);
            throw new internalServerError();
        }
    }


    deleteCategory = async(categoryId) => {
        try{
            const category = await this.repository.getCategory(categoryId);
            if (!category) {
                console.log("CategoryService: ", categoryId, "not found");
                throw new notFound("Category", "id", categoryId);
            }

            const products = await this.productRepository.getProductsByCategory(categoryId);
            if (products.length > 0) {
                console.log(`CategoryService: Category ${categoryId} has linked products.`);
                throw new badRequest("Cannot delete category with existing products");
            }
            const response = await this.repository.deleteCategory(categoryId);
            return response;

        }catch(err){
            if(err.name == "NotFoundError"){
                throw err
            }
            if(err.name == "BadRequestError"){
                throw err
            }
            console.log("CategoryService: ",err)
            throw new internalServerError()
        }
    }

    getProductsByCategory = async(categoryId) => {
        try{
            await this.repository.getCategory(categoryId)
            const response = await this.productRepository.getProductsByCategory(categoryId)
            return response
        }catch(err){
            if(err.name === "NotFoundError"){
                throw err
            }
            console.log("CategoryService: ", err)
            throw new internalServerError()
        }
    }

    getCategoryTree = async() => {
        try{
            const categories = await this.repository.getCategories()
            const categoryMap = {}
            categories.forEach(cat => {
                categoryMap[cat.id] = {...cat.dataValues, children: []}
            });       
            const rootCategories = []
            categories.forEach(cat => {
                if(cat.parentId){
                    categoryMap[cat.parentId].children.push(categoryMap[cat.id])
                }else{
                    rootCategories.push(categoryMap[cat.id])
                }
            });

            return rootCategories

        }catch(err){
            console.log("CategoryService: ", err)
            throw new internalServerError()
        }
    }

    getLeftCategories = async() => {
        try{
            const categories = await this.repository.getCategoriesWithChildren()
            const leafCategories = categories
                .filter(cat => !cat.children || cat.children.length === 0)
                .map(cat => ({ id: cat.id, name: cat.name }));
            return leafCategories;
        }catch(err){
            console.log("CategoryService: ", err)
            throw new internalServerError()            
        }
    }
}



module.exports = CategoryService

