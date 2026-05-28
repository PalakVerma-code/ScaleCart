//order routes that handle order related requests
import express from "express";
import {createOrder,getMyOrders,getOrderById,updateOrderStatus,getAllOrders} from "../controllers/OrderControllers.js";
import {protect,admin} from "../middleware/authMiddleware.js";

const router=express.Router();

//create a new order
//route:POST/api/orders
router.post("/",protect,createOrder);
//get my orders
//router:GET/api/orders/myorders
router.get("/myorders",protect,getMyOrders);
//get order by id
//route:GET/api/orders/:id
router.get("/:id",protect, getOrderById);
//update order status
//route:PUT/api/orders/:id/status
router.put("/:id/status",protect,admin,updateOrderStatus);
//get all orders
//route:GET/api/orders
router.get("/",protect,admin,getAllOrders);

export default router;