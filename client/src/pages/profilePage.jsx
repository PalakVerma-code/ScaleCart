import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/slices/UserSlice';
import { Link } from 'react-router-dom';
import {updateUserProfile,clearError,clearSuccess} from '../redux/slices/UserSlice';

const ProfilePage=()=>{
    const dispatch=useDispatch();
    const {userInfo,Loading,error,success}=useSelector(state=>state.user);//get user info, loading, error and success from user 
    // state in Redux store
    const [name,setName]=React.useState('');//state to store name input value
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');//state to store password input value
    const [confirmPassword,setConfirmPassword]=React.useState('');//state to store confirm password input value
  const [showPassword,setShowPassword]=React.useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=React.useState(false);
    const [localError,setLocalError]=React.useState(null);//state to store local error message for password mismatch
    //pre fill form  with user current data
    useEffect(()=>{
      if(userInfo){
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    },[dispatch,userInfo])

    useEffect(()=>{
        dispatch(clearError());//clear error message from Redux store when component unmounts or when error or success changes
        dispatch(clearSuccess());//clear success message from Redux store when component unmounts or when error or success changes
    },[dispatch,error,success])

//auto hide success message after 3 seconds
    useEffect(()=>{
        if(success){
            const timer=setTimeout(()=>{
                dispatch(clearSuccess());//clear success message from Redux store after 3 seconds
            },3000)
            return ()=>clearTimeout(timer);//clear timer when component unmounts or when success changes
        }
    },[dispatch,success])

    useEffect(()=>{
      if(success){
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
      }
    },[success])
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLocalError(null);//clear local error message before submitting form
        if(password!==confirmPassword){
            setLocalError("Passwords do not match");
            return;
        }
        const updatedData={name};
        if(password){
            updatedData.password=password;
        }
        dispatch(updateUserProfile(updatedData));

    }
    return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Sidebar navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <span>👤</span>
              <span className="text-sm font-medium text-orange-600">
                Profile
              </span>
            </div>
            <Link
              to="/myOrders"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <span>📦</span>
              <span className="text-sm font-medium text-gray-600">
                My Orders
              </span>
            </Link>
          </div>
        </div>

        {/* Profile form */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-6">Profile Information</h2>

          {/* Success message */}
          {success && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
              ✓ Profile updated successfully
            </div>
          )}

          {/* Error message */}
          {(error || localError) && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {localError || error}
            </div>
          )}

          <div className="flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Email — read only, can't change email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Divider */}
            <div className="border-t pt-4 mt-2">
              <p className="text-sm font-medium text-gray-700 mb-4">
                Change Password
                <span className="text-gray-400 font-normal ml-2">
                  (leave blank to keep current)
                </span>
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={Loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl mt-2"
            >
              {Loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
export default ProfilePage;