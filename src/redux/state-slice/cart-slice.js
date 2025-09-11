import {createSlice} from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    name: "cart",
    initialState:{
            List:[],
            Total:0,
    },
    reducers:{
        SetCartList:(state,action)=>{
            state.List=action.payload;
        },
        SetTotal:(state,action)=>{
            state.Total=action.payload;
        }
    }
})
export const {SetCartList,SetTotal}=cartSlice.actions
export default cartSlice.reducer;