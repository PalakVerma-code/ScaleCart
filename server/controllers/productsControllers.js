//handle what heppen when each route is called
import Product from "../models/productModels.js";
import invalidateCache from "../utils/invalidateCache.js";//import invalidate cache function to delete cache when data changes

//get all products
//route :GET/api/products

const getAllProducts=async(req,res)=>{
try{
    const products=await Product.find();//fetch all product from database
    
    res.status(200).json(products);
}catch(error){
    res.status(500).json({message:error.message});
}
}
//get product by id
//route:GET/api/products/:id

const getProductById=async(req,res)=>{
    try{
      const product = await Product.findById(req.params.id)
      if(!product){
        res.status(404).json({message:'Product not found'})
      }
      res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
//create a new product
//route:POST/api/products
const createProduct=async(req,res)=>{
    try{
        const {name,price,description,stock,image}=req.body;//data from request body
        const product =new Product({
            name,
            price,
            description,
            stock,
            image

        }) 

        await product.save();//save to datbase
        await invalidateCache('cache:/api/products*')//invalidate cache for all product related data when a new product is created
        res.status(201).json(product);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
//update a product
//route:PUT/api/products/:id
const updateProduct=async(req,res)=>{
    try{
       
        const productId=await Product.findById(req.params.id);
        if(!productId){
            res.status(404).json({message:'product not found'})
        }
        const updatedProduct=await Product.findByIdAndUpdate(
            req.params.id,//id of product to update
            req.body,//data to update
            {new:true}//option to return updated product
        )
        await invalidateCache('cache:/api/products*')//invalidate cache for all product related data when a product is updated
        res.status(200).json(updatedProduct);

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
//detele a product
//rout:DELETE/spi/products/:id
const deleteProduct=async(req,res)=>{
    try{
        const productId=await Product.findById(req.params.id)
        if(!productId){
            res.status(404).json({message:'product not found'})
        }
        await Product.findByIdAndDelete(req.params.id)
        await invalidateCache('cache:/api/products*')//invalidate cache for all product related data when a product is deleted
        res.status(200).json({message:'product deleted successfully'})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
export {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}