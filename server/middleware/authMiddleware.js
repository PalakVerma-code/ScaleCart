//one job--this is secure route middleware to protect routes that require authentication
//this middleware will check if the user is authenticated by verifying the JWT token sent in the cookies. If the token is valid, it will allow access to the protected route, otherwise, it will return an unauthorized error response. This middleware can be used to protect routes that require user authentication, such as creating, updating, or deleting products, and accessing user profile information.
import jwt from 'jsonwebtoken';
import User from '../models/UserModels.js';
//protect routes check user is logged or not

const protect = async (req, res, next) => {
    let token = req.cookies.jwt;//get token from cookies
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {//if no token then user is not authenticated
       return res.status(401).json({ message: 'Not authorized, no token' })
    }
    else{
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);//verify token and get user id from token
            req.user=await User.findById(decoded.userId).select('-password');//find user by id and attach to request object for use in controllers
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' })
            }
            next();//call next middleware or route handler
        }
        catch(error){
            res.status(401).json({ message: 'Not authorized,invalid token' })
        }
    }
}
//Admin middleware to check if user is admin or not
const admin=async(req,res,next)=>{
     if(req.user&& req.user.role==='admin'){
        next();//if user is admin then call next middleware or route handler
     }else{
          res.status(403).json({ message: 'Not authorized, admin only' })
     }
}
export {protect,admin}