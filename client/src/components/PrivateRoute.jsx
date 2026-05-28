//when user is not authenticated and try to access protected route then this component will redirect user to login page
import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

//for logged in user to access protected routes otherwise redirect to login page
const PrivateRoute=({childern})=>{
    const {userInfo}=useSelector((state)=>state.user);//get user state from Redux store
    return userInfo ? childern : <Navigate to='/login'/>;//if user is authenticated then render childern component otherwise redirect to login page

}
//for admin user to access protected routes otherwise redirect to login page
const AdminRoute=({children})=>{
    const {userInfo}=useSelector((state)=>state.user);//get user state from Redux store
    return userInfo && userInfo.role === 'admin' ? children : <Navigate to='/login'/>;//if user is authenticated and role is admin then render children component otherwise redirect to login page
}
export {PrivateRoute,AdminRoute};