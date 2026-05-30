//handle what heppen when each route is called
import Product from "../models/productModels.js";
import invalidateCache from "../utils/invalidateCache.js";//import invalidate cache function to delete cache when data changes

//get all products
//route :GET/api/products
//route:GET/api/products?page=1&limit=10&search=keyword&category=categoryName 

const getAllProducts=async(req,res)=>{
try{
    const page=Number(req.query.page) || 1;//get page number from query params or default to 1
    const limit=Number(req.query.limit) || 10;//get limit from query params or default to 10
    const keyword=req.query.keyword?{name:{$regex:req.query.keyword,$options:'i'}// // $regex = search pattern, $options: 'i' = case insensitive
      // so searching "NIKE" also finds "nike", "Nike"
      }:{}
      const category=req.query.category?{category:req.query.category}:{}
      const minPrice=req.query.minPrice?{price:{$gte:Number(req.query.minPrice)}}:{}
      const maxPrice=req.query.maxPrice?{price:{$lte:Number(req.query.maxPrice)}}:{}
      const sortBy=req.query.sortBy || 'createdAt';//get sort by field from query params or default to createdAt
      const order=req.query.order==='asc' ? 1 : -1;//get sort order from query params or default to descending
      
  const filter={};//build filter object based on query params
  if(keyword) {
    filter.$or[
        {name:{$regex:req.query.keyword,$options:'i'}}, //search in name
        {description:{$regex:req.query.keyword,$options:'i'}}

    ]
  }
  if(category){
    filter.category=category;//filter by category
  }
  filter.price={$gte:minPrice,$lte:maxPrice};//filter by price range
  //build dort order
  const sortOrder=order === 'asc' ? 1 : -1; //1 for ascending, -1 for descending
  const sortObj={[sortBy]: sortOrder};//build sort object dynamically based on query params
const count=await Product.countDocuments(filter);//count total products matching the search keyword
    const products=await Product.find(filter).sort(sortObj).limit(limit).skip((page-1)*limit);//fetch all product from database
    
    res.status(200).json({
        products,
        page,
        totalPages: Math.ceil(count / limit),
        totalProducts: count,
        keyword,
        category
    });
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
//route:GET/api/products/categories 
const getCategories=async(req,res)=>{
    try{
        const categories=await Product.distinct('category');//get distinct categories from products collection
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,getCategories}