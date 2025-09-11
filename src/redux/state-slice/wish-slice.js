import {createSlice} from "@reduxjs/toolkit";

export const wishSlice=createSlice({
    name: "wish",
    initialState:{
        List:[],
        Total:0,
    },
    reducers:{
        SetWishList:(state,action)=>{
            state.List=action.payload;
        },
        SetTotal:(state,action)=>{
            state.Total=action.payload;
        }
    }
})
export const {SetWishList,SetTotal}=wishSlice.actions
export default wishSlice.reducer;