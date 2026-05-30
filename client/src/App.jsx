import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Navbar from "./components/Navbar";

import {getUserProfile} from './redux/slices/UserSlice';

import {PrivateRoute,AdminRoute} from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPages from "./pages/ProductPages";
import CartPages from "./pages/CartPages";
import CheckOutPage from "./pages/CheckOutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import MyOrderPage from "./pages/MyOrderPage";
import ProfilePage from "./pages/profilePage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
const App=()=>{
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUserProfile());//fetch user profile data and store in Redux store when app loads
  },[dispatch])
    return(
        <Router>
            <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/products/:id"  element={<ProductPages />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/register"      element={<RegisterPage />} />
          <Route path="/profile"       element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/myOrders"         element={<PrivateRoute><MyOrderPage /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products"  element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/orders"    element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/cart"          element={<CartPages />} />
          <Route path="/checkout"      element={<PrivateRoute><CheckOutPage /></PrivateRoute>} />
          <Route path="/orders/:id"     element={<PrivateRoute><OrderConfirmationPage /></PrivateRoute>} />
        </Routes>
      </div>
        </Router>
    );
}
export default App;
