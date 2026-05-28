//order comfirmation page that shows order details and allows user to confirm order
import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';

const OrderConfirmationPage=()=>{
    const {id}=useParams();//get order id from url params
    const [order,setOrder]=useState(null);//state to store order details
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const fetchOrder=async()=>{  
            try{
                const {data}=await axios.get(`/api/orders/${id}`);//make API call to get order details
                setOrder(data.order);//set order details in state
                
            } catch(err){
                console.error('Error fetching order details:', err);
                
            }finally{
                setLoading(false);
            }
          }
          fetchOrder();
},[id])
if (loading) return (
    <div className="text-center py-20 text-gray-500">Loading order...</div>
  );
if (!order) return (
    <div className="text-center py-20 text-red-500">Failed to load order details.</div>
  );
    return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-8">
        Order ID: <span className="font-mono text-sm">{order._id}</span>
      </p>

      <div className="bg-white rounded-xl shadow-sm p-6 text-left mb-6">
        <h2 className="font-bold text-lg mb-4">Items Ordered</h2>
        {order.orderItems.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b last:border-0">
            <span className="text-gray-700">
              {item.name} × {item.quantity}
            </span>
            <span className="font-medium">
              ${(item.amount ?? item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 text-left mb-8">
        <h2 className="font-bold text-lg mb-3">Shipping To</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {order.shippingAddress.address}, {order.shippingAddress.city}<br />
          Pincode: {order.shippingAddress.pinCode}<br />
          Phone: {order.shippingAddress.phone}
        </p>
        <p className="mt-3 text-sm">
          Status:{' '}
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium capitalize">
            {order.status}
          </span>
        </p>
      </div>

      <Link
        to="/"
        className="bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
export default OrderConfirmationPage;