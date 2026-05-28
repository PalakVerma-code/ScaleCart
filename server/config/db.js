import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
//one job--connect to MongoDB database using mongoose

const connectDB=async()=>{
    try{
       const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: succesfully`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
export default connectDB;