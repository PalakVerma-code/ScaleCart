// Cart Pages Component that displays the items in the cart and allows users to proceed to checkout
import {useSelector,useDispatch} from 'react-redux';//to get cart items from store
import {Link ,useNavigate} from 'react-router-dom';//to link to checkout page

import {increaseQuantity,decreaseQuantity,removeFromCart} from '../redux/slices/cartSlice';//to dispatch actions to update cart items

const CartPages=()=>{
    const {cartItems,totalAmount}=useSelector(state=>state.cart);//get cart items and total amount from store
    const dispatch=useDispatch();//initialize dispatch function
    const navigate=useNavigate();//to navigate to checkout page

    const userInfo=useSelector(state=>state.user.userInfo);//get user info from store
  const getItemId=(item)=>item._id??item.id;
    const handleCheckout=()=>{
        if(!userInfo){
            navigate('/login');//navigate to login page if user is not logged in
        } else {
            navigate('/checkout');//navigate to checkout page if user is logged in
        }
    }
    if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some products to get started
        </p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-2.5 rounded-xl hover:bg-orange-600"
        >
          Browse Products
        </Link>
      </div>
    )
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={getItemId(item)}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-gray-100"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-500 font-bold mt-1">
                  ${item.price}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(getItemId(item)))}
                  className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(getItemId(item)))}
                  className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>

              <p className="font-bold w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(removeFromCart(getItemId(item)))} //dispatch action to remove item from cart
                className="text-red-400 hover:text-red-600 text-xl ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-72">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Items ({cartItems.length})</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl mt-6"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartPages;