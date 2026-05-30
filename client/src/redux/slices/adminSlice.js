// main goal is to manage admin related state such as product list, order list, user list etc
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//fetch dashboard stats for admin
export const fetchStats=createAsyncThunk('admin/fetchStats',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('/api/orders/stats');
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to fetch stats');
    }
})

//fetch all products for admin product management page with search and pagination
export const fetchAdminProducts=createAsyncThunk('admin/fetchProducts',async({keyword='', page=1},{rejectWithValue})=>{
    try{
        const response=await axios.get(`/api/products?keyword=${keyword}&page=${page}&limit=6`);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to fetch products');
    }
})

//create product
export const createProduct=createAsyncThunk('admin/createProduct',async(productData,{rejectWithValue})=>{
    try{
        const response=await axios.post('/api/products', productData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to create product');
    }
})

//update product
export const updateProduct=createAsyncThunk('admin/updateProduct',async({id,productData},{rejectWithValue})=>{
    try{
        const response=await axios.put(`/api/products/${id}`, productData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to update product');
    }
})

//delete product
export const deleteProduct=createAsyncThunk('admin/deleteProduct',async(id,{rejectWithValue})=>{
    try{
    await axios.delete(`/api/products/${id}`);
        return { id };//return deleted product id to remove it from UI
    }catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to delete product');
    }
})

//fetch all order
export const fetchOrders=createAsyncThunk('admin/fetchOrders',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('/api/orders');
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to fetch orders');
    }

})
//update order status

export const updateOrderStatus=createAsyncThunk('admin/updateOrderStatus',async({id,status},{rejectWithValue})=>{
    try{
        const response=await axios.put(`/api/orders/${id}/status`,{status});
        console.log('updateOrderStatus response:', response.data);
        return response.data.order || response.data;//return the updated order object to update it in UI
    }
    catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to update order status');
    }
})

//upload product image
export const uploadProductImage=createAsyncThunk('admin/uploadProductImage',async(formData,{rejectWithValue})=>{
    try{
        const response=await axios.post('/api/upload',formData,{
            headers:{
                'Content-Type':'multipart/form-data' //set content type to multipart/form-data for file upload

            }
        });
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data.message || 'Failed to upload product image');
    }
})

const adminSlice=createSlice({
    name:'admin',
    initialState:{
        stats:{}, //dashboard stats such as total sales, total orders, total customers, low stock products etc
        products:[],
        pages:1,
        loading:false,
        imageUrl:'',
        error:null,
        orders:[],
       success:false
    },
    reducers:{
        clearAdminState:(state)=>{
            state.stats={};
            state.imageUrl='';
            
            state.success=false;
        },
           

    },

    extraReducers:(builder)=>{
          const pending=(state)=>{//handle pending state for all async thunks
            state.loading=true;
            state.error=null;
        }
        const rejected=(state,action)=>{ //handle rejected state for all async thunks
            state.loading=false;
            state.error=action.payload;
        }
//stats
        builder.addCase(fetchStats.pending,pending)
        .addCase(fetchStats.fulfilled,(state,action)=>{
            state.loading=false;
            state.stats=action.payload;
        })
        .addCase(fetchStats.rejected,rejected)
        //products
        .addCase(fetchAdminProducts.pending,pending)
        .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload.products;
        })
        .addCase(fetchAdminProducts.rejected,rejected)
        //create product
        .addCase(createProduct.pending,pending)
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.products.unshift(action.payload);//add new product to the beginning of the products array
            state.success=true;
        })
        .addCase(createProduct.rejected,rejected)
        //update product
        .addCase(updateProduct.pending,pending)
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false;
            // Update the product in the products array
            const index=state.products.findIndex(product=>product._id===action.payload._id);
            if(index!==-1){
                state.products[index]=action.payload;
            }
            state.success=true;
        })
        .addCase(updateProduct.rejected,rejected
        )
        //delete product
        .addCase(deleteProduct.pending,pending)
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false;
            // Remove the deleted product from the products array
            state.products=state.products.filter(product=>product._id!==action.payload._id);
        })
        .addCase(deleteProduct.rejected,rejected)
        //orders
        .addCase(fetchOrders.pending,pending)
        .addCase(fetchOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload.orders;
        })
        .addCase(fetchOrders.rejected,rejected)
        //update order status
        .addCase(updateOrderStatus.pending,pending)
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.loading=false;
            // Update the order status in the orders array
            const updated = action.payload?.order || action.payload;
            if(updated && updated._id){
                const index=state.orders.findIndex(order=>order._id===updated._id);
                if(index!==-1){
                    state.orders[index]=updated;
                }
            }
        })
        .addCase(updateOrderStatus.rejected,rejected)
        //upload product image
        .addCase(uploadProductImage.pending,pending)
        .addCase(uploadProductImage.fulfilled,(state,action)=>{
            state.loading=false;
            state.imageUrl=action.payload.imageUrl || action.payload.url || '';
        })
        .addCase(uploadProductImage.rejected,rejected)
    }
});

export const {clearAdminState}=adminSlice.actions;
export default adminSlice.reducer;
