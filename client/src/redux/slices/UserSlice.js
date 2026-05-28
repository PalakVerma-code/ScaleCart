//one job- this is user slice to manage user state in the Redux store
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'; //import axios to make API calls to backend for user authentication and management

//register user
export const registerUser=createAsyncThunk('user/registerUser',
    async(FormData,{rejectWithValue})=>{
        try{
            const {data}=await axios.post('/api/auth/register',FormData);//make API call to register user
            return data;//return user data to be stored in Redux store
        }catch(err){
            return rejectWithValue(err.response.data.message);//return error message to be stored in Redux store
        }
    }
)

//login user

export const loginUser=createAsyncThunk('user/loginUser',
    async(FormData,{rejectWithValue})=>{
        try{
            const {data}=await axios.post('/api/auth/login',FormData);//make API call to login user
            return data;//return user data to be stored in Redux store
        }catch(err){
            return rejectWithValue(err.response.data.message);//return error message to be stored in Redux store
        }
    }
)

//logout user
export const logoutUser=createAsyncThunk('user/logoutUser',
    async()=>{
        
            await axios.post('/api/auth/logout');//make API call to logout user
        
    }
)
//get user profile
export const getUserProfile=createAsyncThunk('user/getUserProfile',
    async(_,rejectWithValue)=>{
    try{
        const {data}=await axios.get('/api/auth/profile');//make API call to get user profile
        return data;//return user profile data to be stored in Redux store
    }catch(err){
        return rejectWithValue(err.response.data.message);//return error message to be stored in Redux store
    }
}
)

//create user slice
const userSlice=createSlice({
    name:'user',
    initialState:{ //initial state of user slice
        userInfo:null,
        Loading:false,
        error:null
    },
    reducers:{
        clearError:(state)=>{
            state.error=null;//clear error message from Redux store
        }
    },
    extraReducers:(builder)=>{
        //register user
        builder.addCase(registerUser.pending,(state)=>{
            state.Loading=true;//set loading to true when register user API call is pending
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.Loading=false;//set loading to false when register user API call is fulfilled
            state.userInfo=action.payload;//set user info in Redux store to the data returned from API call
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.Loading=false;//set loading to false when register user API call is rejected
            state.error=action.payload;//set error message in Redux store to the data returned from API call
        })

        //login user
        builder.addCase(loginUser.pending,(state)=>{
            state.Loading=true;//set loading to true when login user API call is pending
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.Loading=false;//set loading to false when login user API call is fulfilled
            state.userInfo=action.payload;//set user info in Redux store to the data returned from API call
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.Loading=false;//set loading to false when login user API call is rejected
            state.error=action.payload;//set error message in Redux store to the data returned from API call
        })

        // logout user
        builder.addCase(logoutUser.fulfilled,(state)=>{
            state.userInfo=null;//clear user info from Redux store when logout user API call is fulfilled
        })
        //get user profile
        
        builder.addCase(getUserProfile.fulfilled,(state,action)=>{
            state.Loading=false;//set loading to false when get user profile API call is fulfilled
            state.userInfo=action.payload;//set user info in Redux store to the data returned from API call
        })
        builder.addCase(getUserProfile.rejected,(state,action)=>{
            state.Loading=false;//set loading to false when get user profile API call is rejected
            state.error=action.payload;//set error message in Redux store to the data returned from API call
        })
        
    }
})
export const {clearError}=userSlice.actions;//export clearError action to be used in components to clear error message from Redux store
export default userSlice.reducer;//export user reducer to be used in store