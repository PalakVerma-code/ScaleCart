//one job - generate token for user authentication
import jwt from 'jsonwebtoken';

export const generateToken=(res,userId)=>{
    const token = jwt.sign(
        {
           userId,
        },
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )
    //token will be valid for 5 days as specified in .env file
    res.cookie('jwt',token,{
        httpOnly:true,//cookie cannot be accessed by client side js for security
        secure:process.env.NODE_ENV==='production',//cookie only sent over https in production
        sameSite:'strict',//cookie only sent for same site requests to prevent CSRF //cross site request forgery attacks
        maxAge:5*24*60*60*1000//cookie expires in 5 days
    })
    return token
}