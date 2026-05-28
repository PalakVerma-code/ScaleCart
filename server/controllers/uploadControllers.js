//one job-- handle image uploads using multer and cloudinary
const uploadImage=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:'No file uploaded'})
        }

        res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path
      // example: "https://res.cloudinary.com/your_cloud/image/upload/v123/scalecart-products/abc123.jpg"
    }) } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({message:'Internal server error'})
    }
}
export default uploadImage;