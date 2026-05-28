//one-job-- configure cloudinary for image upload and management
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();//load environment variables from .env file

cloudinary.config({
    
    cloud_name:process.env.Cloudinary_CLOUD_NAME,
    api_key:process.env.Cloudinary_API_KEY,
    api_secret:process.env.Cloudinary_API_SECRET
})
export default cloudinary;