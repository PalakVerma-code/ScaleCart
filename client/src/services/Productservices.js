//One job- connect frontend to backend
//All api calls related to products will be here  ,so that we can easily manage them in one place
import axios from 'axios';
const API_URL='/api/products';
//get all products
 const getProducts=async()=>{
    try{
        const response = await axios.get(API_URL);
        // server returns { products, page, totalPages, totalProducts }
        return response.data.products || response.data;
    }
    catch(error){
        console.error('Error fetching products:',error);
        throw error;//throw error to be handled by caller
    }
    
}
const getSingleProduct=async(id)=>{
    try{
        const responce=await axios.get(`${API_URL}/${id}`);
        return responce.data;//return data from response
    }
    catch(error){
        console.error('Error fetching single product:',error);
        throw error;//throw error to be handled by caller
    }
}
const createProduct=async(productData)=>{
    try{
        const response = await axios.post(API_URL,productData);
        return response.data;//return created product data
    }
    catch(error){
        console.error('Error creating product:',error);
        throw error;//throw error to be handled by caller
    }
}
const updateProduct=async(id,productdata)=>{
    try{
        const response = await axios.put(`${API_URL}/${id}`,productdata);
        return response.data;//return updated product data 
    }
    catch(error){
        console.error('Error updating product:',error);
        throw error;//throw error to be handled by caller
    }
}
const deleteProduct=async(id,productData)=>{
    try{
        const response = await axios.delete(`${API_URL}/${id}`,productData);
        return response.data;//return deleted product data
    }
    catch(error){
        console.error('Error deleting product:',error);
        throw error;//throw error to be handled by caller
    }
}

const Productservices={
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
export default Productservices;//export all functions as an object so that we can import them in other files and use them