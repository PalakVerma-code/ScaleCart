//one job--delete cached data when it changes
//when update delete create

import redisClient from '../config/redis.js';

const invalidateCache=async(pattern)=>{
    try{
        const keys=await redisClient.keys(pattern);//get all cache keys matching the pattern
        if(keys.length>0){
            await redisClient.del(keys);//delete all matching cache keys from redis when data changes
            console.log('Cache invalidated for pattern:',pattern);
        }
    }
    catch(err){
        console.error('Redis error',err);
    }
}

export default invalidateCache;