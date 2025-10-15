import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        List: [],
        ProductDetails: [],
        ListByKeyword: [],
        ListByRemark: [],
        ListByBrand: [],
        ListByCategory: [],
        BrandList: [],
        CategoryList: [],
    },
    reducers: {
        SetProductList: (state, action) => {
            state.List = action.payload
        },
        SetProductDetails: (state, action) => {
            state.ProductDetails = action.payload
        },
        SetListByKeyword: (state, action) => {
            state.ListByKeyword = action.payload
        },
        SetListByRemark: (state, action) => {
            state.ListByRemark = action.payload
        },
        SetListByBrand: (state, action) => {
            state.ListByBrand = action.payload
        },
        SetListByCategory: (state, action) => {
            state.ListByCategory = action.payload
        },
        SetBrandList: (state, action) => {
            state.BrandList = action.payload
        },
        SetCategoryList: (state, action) => {
            state.CategoryList = action.payload
        }
    }
})

export const {
    SetProductList,
    SetProductDetails,
    SetListByKeyword,
    SetListByRemark,
    SetListByBrand,
    SetListByCategory,
    SetBrandList,
    SetCategoryList
} = productSlice.actions;
export default productSlice.reducer;