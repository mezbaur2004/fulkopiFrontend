import {createSlice} from "@reduxjs/toolkit";

export const productSlice=createSlice({
    name: "product",
    initialState:{
        List:[],
        ProductDetails:{}
    },
    reducers:{
        SetProductList:(state,action)=>{
            state.List=action.payload
        },
        SetProductDetails:(state,action)=>{
            state.ProductDetails=action.payload
        },
    }
})

export const {SetProductList, SetProductDetails}=productSlice.actions;
export default productSlice.reducer;