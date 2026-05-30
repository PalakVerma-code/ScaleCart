
import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getMyOrders} from '../redux/slices/UserSlice';
import {Link} from 'react-router-dom';

const statusColors = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100   text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100  text-green-700',
  cancelled:  'bg-red-100    text-red-700'
};

const MyOrderPage=()=>{
    const dispatch=useDispatch();
    const {myOrders,loading,error}=useSelector(state=>state.user);

    useEffect(()=>{
        dispatch(getMyOrders());
    },[dispatch]);


    if(loading) return <div className="text-center py-20 text-gray-500">Loading orders...</div>
    if(error) return <div className="text-center py-20 text-red-500">{error}</div>

    return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {myOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-5xl mb-4">📦</p>
          <h2 className="text-xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet
          </p>
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-2.5 rounded-xl hover:bg-orange-600"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-5"
            >
              {/* Order header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-mono">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString(
                      'en-IN',
                      {
                        day:   'numeric',
                        month: 'long',
                        year:  'numeric'
                      }
                    )}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize
                  ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order items */}
              <div className="flex flex-col gap-2 mb-4">
                {order.orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                    />
                    <span className="flex-1 text-gray-700">
                      {item.name}
                    </span>
                    <span className="text-gray-500">
                      × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="flex justify-between items-center
                border-t pt-4"
              >
                <div className="text-sm text-gray-500">
                  📍 {order.shippingAddress.city},{' '}
                  {order.shippingAddress.pincode}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-orange-500">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
    
}
export default MyOrderPage;