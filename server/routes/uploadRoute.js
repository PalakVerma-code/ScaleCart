//one job- define route for image upload and use multer middleware to handle file uploads and cloudinary to store images in the cloud
import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import uploadImage from '../controllers/uploadControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
const router=express.Router();
//route:POST/api/upload

router.post('/', protect, admin, upload.single('image'), uploadImage);



export default router;

