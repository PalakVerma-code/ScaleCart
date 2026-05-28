import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authroutes.js';
import uploadRoutes from './routes/uploadRoute.js';
import orderRoutes from './routes/orderRoute.js';
import redisClient from './config/redis.js';

connectDB();
dotenv.config();
const app=express();
const port=process.env.PORT || 5000;
app.use(express.json());//allow us to accept json data in request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());//allow us to parse cookies in request //for authentication


app.use('/api/auth',authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/products',productRoutes);//use product routes for all routes starting with /api/products
app.use('/api/orders',orderRoutes);//use order routes for all routes starting with /api/orders

//error handling middleware
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})