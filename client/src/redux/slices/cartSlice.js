//one job- manage the cart state in the Redux store
import {createSlice} from '@reduxjs/toolkit';

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],//array to hold cart items
        totalAmount:0,//total amount of cart
    },
    reducers:{
        addToCart:(state,action)=>{
            const newItem=action.payload;//new item to add to cart
            const existingItem=state.cartItems.find(item=>item.id===newItem.id);//check if item already exists in cart
            if(existingItem){
                existingItem.quantity+=1;
            } else {
                state.cartItems.push({...newItem, quantity: 1});
            }
            state.totalAmount=state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);//update total amount of cart
        },
        removeFromCart:(state,action)=>{
           state.cartItems=state.cartItems.filter(item=>item.id!==action.payload);//remove item from cart
           state.totalAmount=state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);//update total amount of cart
        }
    }
})
export const {addToCart,removeFromCart}=cartSlice.actions;//export actions to be used in components
export default cartSlice.reducer;//export reducer to be used in store
