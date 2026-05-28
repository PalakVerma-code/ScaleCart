import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';//to get the state of cart from store
import {useNavigate} from 'react-router-dom';//to navigate to different routes
import {logoutUser} from '../redux/slices/UserSlice';
import {useDispatch} from 'react-redux';//to dispatch logout action to store

const Navbar=()=>{
    const {cartItems}=useSelector(state=>state.cart);//get cart items from store
    const {userInfo}=useSelector(state=>state.user);//get user info from store
    const dispatch=useDispatch();//initialize dispatch function
    const navigate=useNavigate();//to navigate to different routes

    const handleLogout=()=>{
        dispatch(logoutUser());//dispatch logout action to store
        navigate('/login');//navigate to login page after logout
    }

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
            {userInfo.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                Admin
              </Link>
            )}
            <span className="text-sm text-gray-300">Hi, {userInfo.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-sm text-gray-300 hover:text-white"
            >
              Login
            </Link>
            <Link to="/register"
              className="text-sm bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg"
            >
              Register
            </Link>
          </div>
        )}
    </nav>
    );
};

export default Navbar;