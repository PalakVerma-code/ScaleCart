//One job- display home page with list of products and add to cart functionality
import React, { useEffect, useState } from 'react';
import Productservices from '../services/Productservices';
import ProductCard from '../components/ProductCard';

const HomePage=()=>{
    const [products,setProducts]=useState([]);//state to hold products data
   const [loading,setLoading]=useState(true);//state to manage loading state
   const [error,setError]=useState(null);//state to manage error state

   useEffect(()=>{
    const fetchProducts=async()=>{
        try{
            const data=await Productservices.getProducts();//fetch products from backend
            setProducts(data||[]);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };
    fetchProducts();
   },[])//empty dependency array to run only once on component mount
if (loading) return (
    <div className="text-center py-20 text-gray-500">Loading products...</div>
  )

  if (error) return (
    <div className="text-center py-20 text-red-500">{error}</div>
  )
return (<div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
</div>)

}
export default HomePage;
