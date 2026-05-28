import {useDispatch} from "react-redux";//to dispatch actions to store //to add item to cart
import {addToCart} from "../redux/slices/cartSlice";//import action to add item to cart
import {useState,useEffect} from "react";


import {useParams} from "react-router-dom";
import Productservice from "../services/Productservices";
const ProductPages=()=>{
    const {id}=useParams();//get product id from url
    const dispatch=useDispatch();//to dispatch actions to store //to add item to cart
    const [product,setProduct]=useState(null);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const fetchProduct=async()=>{
            try{
                const data=await Productservices.getProductById(id);//fetch product details from backend
                setProduct(data);
            } catch(error){
                setError(error.message);
            } finally{
                setLoading(false);
            }
        }
        fetchProduct();//call function to fetch product details
    },[id])//dependency array to re-fetch product when id changes

     if (loading) return (
    <div className="text-center py-20 text-gray-500">Loading...</div>

  )

return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg bg-gray-100"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-orange-500 font-bold text-2xl mt-4">
            ${product.price}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {product.stock} in stock
          </p>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )

}
export default ProductPages;