//one job-- login page component to handle user login and authentication
import React, { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {loginUser, clearError} from '../redux/slices/UserSlice'

const LoginPage=()=>{
    const [email,setEmail]=useState('');//state to store email input
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();//state to dispatch actions to Redux store
    const navigate=useNavigate();//navigate to different routes after login
    const {userInfo,loading,error}=useSelector((state)=>state.user);//get user state from Redux store

    //if user is already logged in then redirect to home page
    useEffect(()=>{
        if(userInfo){
            navigate(userInfo.role === 'admin' ? '/admin' : '/');//redirect to home page
        }
    },[userInfo,navigate])

//clear error message when user starts typing in input fields
    useEffect(()=>{
        if(error){
            dispatch(clearError());//clear error message from Redux store
        }
    },[email,password,dispatch,error])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        dispatch(loginUser({email,password})); //dispatch loginUser action to login user and store user data in Redux store
    }

    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Login to your ScaleCart account
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm mt-2 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-500 font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
export default LoginPage;