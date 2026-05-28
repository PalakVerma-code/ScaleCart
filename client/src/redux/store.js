//one job- centralize state management for the application using Redux
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/UserSlice';//import user reducer to manage user state in Redux store

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  }
});

export default store;