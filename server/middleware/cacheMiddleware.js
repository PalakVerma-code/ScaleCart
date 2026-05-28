//one job -- implement caching middleware using redis to cache product data and improve performance
//caching middleware will check if the requested product data is available in redis cache before querying the database. If the data is found in cache, it will be returned immediately, otherwise, the request will proceed to the next middleware or route handler to fetch data from the database and store it in cache for future requests.
import redisClient from '../config/redis.js';

const cache=(duration)=>{ //duration is the time in seconds for which the data should be cached in redis
    return async(req,res,next)=>{
        const key=`cache:${req.originalUrl}`;//create a unique cache key based on the request URL //like cache:/api/products/123  //like cache:/api/products?page=1&limit=10
        try{
            const cachedData=await redisClient.get(key);//check if data is available in cache
            //cache hit
            if(cachedData){
                console.log('Cache hit for key:',key);
                return res.json(JSON.parse(cachedData));//if data is found in cache return it as json response
            }
// cahce miss
             console.log('Cache miss for key:',key);
            const originalJson = res.json.bind(res)//store original res.json method in sendResponse property of response object
            res.json= async(data)=>{ //override res.json method to store data in cache before sending response
               await redisClient.setex(key,duration,JSON.stringify(data));//store data in cache with expiration time
                return originalJson(data);//call original res.json method to send response
            }

            next();//call next middleware or route handler if cache miss
        }
        catch(err){
            console.error('Redis error',err);
            res.status(500).json({error:'Redis error'});//send error response if redis operation fails
            next();//call next middleware with error to handle it in error handling middleware
        }
    }
}
export default cache;
    
