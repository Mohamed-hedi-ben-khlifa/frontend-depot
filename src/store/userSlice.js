import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'



export const auth = createAsyncThunk('user/connexion',async (user,thunkAPI)=>{
    try{
        const resp = await axios.post(process.env.REACT_APP_BASE_URL+'/api/User/login',user)
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})

export const socket = createAsyncThunk('user/socket',async (user,thunkAPI)=>{
    try{
        const resp = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/User/socket',user)
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})

export const get_employées = createAsyncThunk('user/get_employées',async (_,thunkAPI)=>{
    try{
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/User/liste_des_employees')
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})


const usertSlice = createSlice({

    name: 'users',
    initialState: { 
        user:{ 
            _id:null,
            nom:null,
            prenom: null,
            email: null,
            pasword: null,
            telephone: null,
            adress: null,
            cin: null,
            role: null,
            dateN: null,
            codepostal: null,
            dateCreation: null,
            image: null},
        isLogin:false,

    },
    extraReducers:{
      
        [auth.fulfilled]: (state,action) =>{
            if(action.payload.success ){
                state.user = action.payload.user
                state.isLogin = true
            
            }else{
                state.user = {}
                state.isLogin = false
            }

        },

        logout: (state) =>{
            state.isLogin = false
            state.user = {}
        }



    
       
        
    },

})

export const {logout} = usertSlice.actions

export default usertSlice.reducer