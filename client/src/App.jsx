import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {getUserProfile} from './redux/slices/UserSlice';

import {PrivateRoute,AdminRoute} from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPages from "./pages/ProductPages";
import CartPages from "./pages/CartPages";
import CheckOutPage from "./pages/CheckOutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
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
          <Route path="/profile"       element={<PrivateRoute><h1 className="text-center py-20 text-gray-500">User Profile Page (Protected)</h1></PrivateRoute>} />
          <Route path="/admin/dashboard"         element={<AdminRoute><h1 className="text-center py-20 text-gray-500">Admin Dashboard (Protected)</h1></AdminRoute>} />
          <Route path="/cart"          element={<CartPages />} />
          <Route path="/checkout"      element={<PrivateRoute><CheckOutPage /></PrivateRoute>} />
          <Route path="/order/:id"     element={<PrivateRoute><OrderConfirmationPage /></PrivateRoute>} />
        </Routes>
      </div>
        </Router>
    );
}
export default App;
