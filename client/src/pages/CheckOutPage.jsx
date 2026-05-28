// checkout page to show order summary and place order
import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {clearCart} from '../redux/slices/cartSlice';

const CheckOutPage=()=>{
    const dispatch=useDispatch();//initialize dispatch function
    const navigate=useNavigate();//initialize navigate function//to navigate to order confirmation page after placing order
    const [address,setAddress]=React.useState('');//state to store shipping address
    const [city,setCity]=React.useState('');//state to store city
    const [pinCode,setPinCode]=React.useState('');//state to store pin code
    const [phone,setPhone]=React.useState('');//state to store phone number
    const [loading,setLoading]=React.useState(false);//state to show loading spinner while placing order
    const [error,setError]=React.useState('');//state to show error message if placing order fails
    
    const {cartItems,totalAmount}=useSelector(state=>state.cart);//get cart items and total amount from store
    const userInfo =useSelector(state=>state.user.userInfo);//get user info from store
    const getItemId=(item)=>item._id??item.id;
    const handlePlaceOrder=async()=>{
        if(!address || !city || !pinCode || !phone){
            setError('Please fill all the fields');
            return;
        }
        setLoading(true);
        setError('');
        try{ 
            //build order payload and make API call to place order
             const orderdata= {
            orderItems:cartItems.map(item=>({
                name:item.name,
                quantity:item.quantity,
                image:item.image,
            products:getItemId(item),
                amount:item.price*item.quantity,
             }
            )),
            shippingAddress:{
                address,
                city,
                pinCode,
                phone
            },
            totalAmount
        }

            const {data}=await axios.post('/api/orders',orderdata)
            //dispatch action to clear cart after placing order
            dispatch(clearCart());
            setLoading(false);
            navigate(`/order/${data._id}`);//navigate to order confirmation page with order id

        } catch (error) {
            console.error('Error placing order:', error);
           
            setError('Failed to place order. Please try again.');
        }
        finally{
            setLoading(false);
        }
    }
    return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Shipping Form */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-6">Shipping Address</h2>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="400001"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-72">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
export default CheckOutPage;
