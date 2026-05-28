//one job-- handle image uploads using multer and cloudinary
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
//configure multer storage to store uploaded files in memory
const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'scaleCart',//folder in cloudinary to store uploaded images
        allowed_formats:['jpg','jpeg','png'],//allowed file formats for upload
        transformation:[{width:500,height:500,crop:'limit',quality:'auto'}]//optional transformation to resize images to a maximum width and height of 500px while maintaining aspect ratio

    }
})
const limit=5*1024*1024;//limit file size to 5MB
const upload=multer({storage,limits:{fileSize:limit}});
export default upload;