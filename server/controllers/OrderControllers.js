//one job -- > handle order related operations like creating orders, fetching user orders, updating order status, etc.
import Order from "../models/OrderModels.js";
import Product from "../models/productModels.js";
import invalidateCache from "../utils/invalidateCache.js";

//create a new order
//route:POST/api/orders

const createOrder=async(req,res)=>{
    try{
        const {orderItems,orderItem,shippingAddress,totalAmount}=req.body;//data from request body
        const items=orderItems ?? orderItem ?? [];
        const normalizedItems=await Promise.all(items.map(async(item)=>{
            const productId=item.products ?? item.product;
            const product=await Product.findById(productId);
            if(!product){
                throw new Error(`Product with id ${productId} not found`);

            }
            if(product.stock<item.quantity){
                throw new Error(`Insufficient stock for product ${product.name}`);
            }
            //reduce stock
            product.stock-=item.quantity;
            await product.save();
            return{
                name:product.name,
                quantity:item.quantity,
                image:product.image,
                products:product._id,
                amount:product.price * item.quantity,
            }
        }))
        const order=new Order({ //create new order document
            user:req.user._id, //user id from auth middleware
            orderItems:normalizedItems,
            shippingAddress,
            totalAmount,
        })
        await order.save();
        await invalidateCache(`cache:/api/orders/user/${req.user._id}`)//invalidate cache for user orders when a new order is created
        res.status(201).json(order);
    }catch(error){
        res.status(400).json({message:error.message});
    }
           
}
//get my orders
//route:GET/api/orders/myorders
const getMyOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id}).sort({createdAt: -1});//fetch orders for the logged in user and sort by most recent
         //fetch orders for the logged in user and populate product details
        res.status(200).json({orders});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}    

//get order by id
//route:GET/api/orders/:id
const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate('user', 'name email');//fetch order by id and populate user details
        if(!order){
            res.status(404).json({message:'Order not found'})
        }
        //make sure the user can only access their own orders
        if(order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin'){
            return res.status(403).json({message:'Access denied'});
        }

        res.status(200).json({order});

    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

//get All orders (admin only)
//route:GET/api/orders

const getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find().populate('user','name email').sort({createdAt:-1});//fetch all orders and populate user details
        res.status(200).json({orders});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
//update order status (admin only)
//route:PUT/api/orders/:id/status

const updateOrderStatus=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            res.status(404).json({message:'Order not found'});
        }
        order.status=req.body.status;//update order status from request body
        if(req.body.status==='Delivered'){
            order.isDelivered=true;
        }
        await order.save();//update order in database
        await invalidateCache(`cache:/api/orders/user/${order.user}`)//invalidate cache for user orders when order status is updated
        res.status(200).json({message:'Order status updated successfully',order});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
export {createOrder,getMyOrders,getOrderById,getAllOrders,updateOrderStatus};