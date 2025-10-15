import {createSlice} from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        List: [],
        ProductList: []
    },
    reducers: {
        SetInvoiceList: (state, action) => {
            state.List = action.payload;
        },
        SetInvoiceProductList: (state, action) => {
            state.ProductList = action.payload;
        }
    }
})
export const {SetInvoiceList, SetInvoiceProductList} = invoiceSlice.actions
export default invoiceSlice.reducer;