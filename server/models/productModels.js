import mongoose from 'mongoose';

const productSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true
    },
    price:{
      type:Number,
      required:true,
      default:0.0
    },
    description:{
     type:String,
      required:true
    },stock:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
        default:"no-img.png"
    },
    category:{
        type:String,
        required:true,
       default:'general',
       lowercase:true,
         trim:true
    }
},{
    timestamps:true
})
const Product=mongoose.model('Product',productSchema);
export default Product;