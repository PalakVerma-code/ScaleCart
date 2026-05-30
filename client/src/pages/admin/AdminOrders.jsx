//main goal : to create admin orders page where admin can see all orders, filter by status and update order status
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/slices/adminSlice';

//status options for filtering and updating order status

const statusColors = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100   text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100  text-green-700',
  cancelled:  'bg-red-100    text-red-700'
};

const AdminOrders=()=>{
    const dispatch=useDispatch();
    const {orders,loading,error}=useSelector(state=>state.admin);//get orders from admin state in Redux store
    useEffect(()=>{
        dispatch(fetchOrders());
    },[dispatch])

const handleStatusChange=(orderId,newStatus)=>{
    dispatch(updateOrderStatus({id:orderId,status:newStatus}));//dispatch updateOrderStatus action to update order status
}
if (loading) return (
    <div className="text-center py-20 text-gray-500">
      Loading orders...
    </div>
  )
   
   return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No orders yet
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">
                  Order ID
                </th>
                <th className="text-left px-4 py-3 text-gray-600">
                  Customer
                </th>
                <th className="text-left px-4 py-3 text-gray-600">
                  Total
                </th>
                <th className="text-left px-4 py-3 text-gray-600">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{order.user?.name}</p>
                    <p className="text-xs text-gray-400">
                      {order.user?.email}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-bold text-orange-500">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {/* Dropdown to change status */}
                    <select
                      value={order.status ? order.status.toLowerCase() : ''}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[(order.status || '').toLowerCase()] || 'bg-gray-100 text-gray-700'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )


}
export default AdminOrders;