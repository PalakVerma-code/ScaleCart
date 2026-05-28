//one job- manage the cart state in the Redux store
import {createSlice} from '@reduxjs/toolkit';

const getItemId = (item) => item?._id ?? item?.id;

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],//array to hold cart items
        totalAmount:0,//total amount of cart
    },
    reducers:{
        addToCart:(state,action)=>{
            const newItem=action.payload;//new item to add to cart
            const newItemId=getItemId(newItem);//support both backend _id and local id fields
            const existingItem=state.cartItems.find(item=>getItemId(item)===newItemId);//check if item already exists in cart
            if(existingItem){
                existingItem.quantity+=1;
            } else {
                state.cartItems.push({...newItem, id:newItemId, quantity: 1});
            }
            state.totalAmount=state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);//update total amount of cart
        },
        removeFromCart:(state,action)=>{
           state.cartItems=state.cartItems.filter(item=>getItemId(item)!==action.payload);//remove item from cart
           state.totalAmount=state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);//update total amount of cart

        },
        increaseQuantity:(state,action)=>{
            const item=state.cartItems.find(item=>getItemId(item)===action.payload);
            if(item){
                item.quantity+=1;
            }
            state.totalAmount=state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);//update total amount of cart
    },
    decreaseQuantity:(state,action)=>{
        const item=state.cartItems.find(item=>getItemId(item)===action.payload);
        if(item&&item.quantity>1){
            item.quantity-=1;
        }
        state.totalAmount=state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);//update total amount of cart
    },
    clearCart:(state)=>{
        state.cartItems=[];//clear cart items
        state.totalAmount=0;//reset total amount of cart
    }
}
})
export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart}=cartSlice.actions;//export actions to be used in components 
export default cartSlice.reducer;//export reducer to be used in store
