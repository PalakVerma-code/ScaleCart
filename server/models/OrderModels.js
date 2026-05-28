//one job-- > describe what the look like in database

import mongoose from "mongoose";

const OrderItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    quantity:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        
    },
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }

})
const OrderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderItems:[OrderItemSchema], //array of order items
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        pinCode:{type:String,required:true},
        phone:{type:String,required:true},
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    isDelivered:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        enum:["Pending","Processing","Shipped","Delivered","Cancelled"],
        default:"Pending",
    },
},{
    timestamps:true,
});
const OrderModel=mongoose.model("Order",OrderSchema);
export default OrderModel;
