import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';//to get the state of cart from store and dispatch actions
import {logoutUser} from '../redux/slices/UserSlice';

const Navbar=()=>{
    const {cartItems}=useSelector(state=>state.cart);//get cart items from store
    const {userInfo}=useSelector(state=>state.user);//get user info from store
    const dispatch=useDispatch();//initialize dispatch function
    const navigate=useNavigate();//to navigate to different routes

    const handleLogout=()=>{
        dispatch(logoutUser());//dispatch logout action to store
        navigate('/login');//navigate to login page after logout
    }

    const firstName=userInfo?.name?.split(' ')[0] || userInfo?.name || 'Profile';

    return(
        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">
        ScaleCart
      </Link>
      <Link to="/cart" className="flex items-center gap-2">
        🛒 Cart
        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          {cartItems.reduce((total,item)=>total+(item.quantity||1),0)} 
        </span>
      </Link>
      {userInfo ? (
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
          >
            👤 {firstName}
          </Link>

          <Link
            to="/myOrders"
            className="text-sm text-gray-300 hover:text-white"
          >
            My Orders
          </Link>

          {userInfo.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              className="text-sm bg-purple-600 px-3 py-1 rounded-lg hover:bg-purple-700"
            >
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-sm border border-gray-600 px-3 py-1 rounded-lg hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm bg-orange-500 px-4 py-1.5 rounded-lg hover:bg-orange-600"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
    );
};

export default Navbar;