//one job--connect url to right controllers functions
import express from 'express';

import { registerUser, loginUser, logoutUser,getUserProfile,getMe,updateUserProfile } from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router=express.Router();

//route:POST/api/auth/register
router.post('/register',registerUser);
//route:POST/api/auth/login
router.post('/login',loginUser);
//route:POST/api/auth/logout
router.post('/logout',logoutUser);
//route:GET/api/auth/profile
router.get('/profile',protect,getUserProfile);//protect route to get user profile //only logged in user can access this route
//route:GET/api/auth/me
router.get('/me',protect,getMe);//protect route to get current user's profile //only logged in user can access this route
//route:PUT/api/auth/profile
router.put('/profile',protect,updateUserProfile);//protect route to update user profile //only logged in user can access this route
export default router;