// one job - connect url to right controllers functions

import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,getCategories } from '../controllers/productsControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import cache from '../middleware/cacheMiddleware.js';//import caching middleware to cache product data and improve performance
const router=express.Router();
//route:GET/api/products
router.get('/',cache(3600),getAllProducts);
//route:GET/api/products/:id
router.get('/:id',cache(3600),getProductById);
//route:POST/api/products
router.post('/',protect,admin,createProduct);//only admin can create,update and delete products
//route:PUT/api/products/:id
router.put('/:id',protect,admin,updateProduct);
//route:DELETE/api/products/:id
router.delete('/:id',protect,admin,deleteProduct);//only admin can create,update and delete products
//route:GET/api/products/categories
router.get('/categories',cache(3600),getCategories);
export default router;
