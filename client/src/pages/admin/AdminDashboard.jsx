//main goal--> to create admin dashboard page where admin can see stats, manage products, orders and users
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStats } from '../../redux/slices/adminSlice';

//reuseable component to show stats in dashboard
const StatCard=({title,value,icon,color})=>{
    return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${color}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
    )
}

const AdminDashboard=()=>{
    const dispatch=useDispatch();
    const {stats,loading,error}=useSelector(state=>state.admin);//get stats from admin state in Redux store
    useEffect(()=>{
        dispatch(fetchStats());
    },[dispatch])

    if (loading || !stats) return (
    <div className="text-center py-20 text-gray-500">
      Loading dashboard...
    </div>
  )
//extract pending count  from stats.ordersByStatus array
    const pendingCount = stats.ordersByStatus?.find((status) => status._id === 'Pending')?.count || 0;
   return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">
        Welcome back. Here's what's happening.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders || 0}
          icon="📦"
          color="border-blue-500"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue ? `$${stats.totalRevenue.toFixed(2)}` : '$0.00'}
          icon="💰"
          color="border-green-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts || 0}
          icon="🛍️"
          color="border-purple-500"
        />
        <StatCard
          title="Pending Orders"
          value={pendingCount}
          icon="⏳"
          color="border-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <Link
          to="/admin/products"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition flex items-center gap-4"
        >
          <span className="text-4xl">🛍️</span>
          <div>
            <h3 className="font-bold text-lg">Manage Products</h3>
            <p className="text-gray-500 text-sm">
              Add, edit, or delete products
            </p>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition flex items-center gap-4"
        >
          <span className="text-4xl">📋</span>
          <div>
            <h3 className="font-bold text-lg">Manage Orders</h3>
            <p className="text-gray-500 text-sm">
              View and update order statuses
            </p>
          </div>
        </Link>
      </div>

      {/* Low Stock Warning */}
      {stats.lowStockProducts > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="font-bold text-red-700 mb-3">
            ⚠️ Low Stock Alert
          </h2>
          <div className="flex flex-col gap-2">
            {stats.lowStockProducts.map((p) => (
              <div
                key={p._id}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-700">{p.name}</span>
                <span className="text-red-600 font-bold">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default AdminDashboard;
