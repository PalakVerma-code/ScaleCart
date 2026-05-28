//one job-- better to use redis for caching and session management
//create and export a redis client instance
//redis is a key-value store that can be used for caching and session management in web applications. It is an in-memory data structure store that supports various data types such as strings, hashes, lists, sets, and sorted sets. Redis is known for its high performance and scalability, making it a popular choice for caching and session management in web applications.
import Redis from 'ioredis';
const redisClient = new Redis({ //configure redis connection using environment variables
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
});
redisClient.on('connect',()=>{ //handle successful connection
    console.log('Connected to Redis');
})
redisClient.on('error',(err)=>{ //handle connection errors
    console.error('Redis connection error', err);
})

export default redisClient;