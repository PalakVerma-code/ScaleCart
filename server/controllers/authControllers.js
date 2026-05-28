//one job--handle user registration and login logic
import User from "../models/UserModels.js";
import { generateToken } from "../utils/generateToken.js";
//register a new user
//route:POST/api/auth/register

 const registerUser=async(req,res)=>{
    try{
        const body = req.body || {};//data from request body
        const name = body.name || body.Name;
        const email = body.email || body.Email;
        const password = body.password || body.Password;
        const role = body.role || body.Role;
        // Log only non-sensitive fields for debugging
       
        if(!name || !email || !password){
            return res.status(400).json({message:'Name, email, and password are required'})
        }
        //check it user exis or not
        const userexists=await User.findOne({email});
        if(userexists){
            return res.status(400).json({message:'User already exists'})
        }
     //if user not exist then create new user
     const user=await User.create({
          name,
          email,
          password,
          role: role === 'admin' ? 'admin' : 'customer'
     })
     if(user){
        generateToken(res,user._id);//generate token and send in response
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
          
             })
     }else{
        res.status(400).json({message:'Invalid user data'})
     }
       
     }

      catch (error) {
        res.status(500).json({message:error.message})
       }
}
//login user
//route:POST/api/auth/login
 const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body || {};//data from request body
        if(!email || !password){
            return res.status(400).json({message:'Email and password are required'})
        }
        const user=await User.findOne({email});//find user by email
        if(user&& (await user.comparePassword(password))){
            generateToken(res,user._id);//generate token and send in response
                    res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        })
        }else{
            return res.status(401).json({message:'Invalid email or password'})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }
       
}
// logout user
//route:POST/api/auth/logout
const logoutUser=async(req,res)=>{

    res.cookie('jwt', '', {//clear the cookie by setting it to empty string
    httpOnly: true,  //cookie cannot be accessed by client side js for security
        expires: new Date(0),
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
  })
  res.status(200).json({ message: 'Logged out successfully' })
}


//get user profile
//route:GET/api/auth/profile

const getUserProfile=async(req,res)=>{
    try{
        const user = req.user;//user attached by auth middleware
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message:'User not found'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
export {registerUser,loginUser,logoutUser,getUserProfile}