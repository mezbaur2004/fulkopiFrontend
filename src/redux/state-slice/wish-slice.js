import {createSlice} from "@reduxjs/toolkit";

export const wishSlice = createSlice({
    name: "wish",
    initialState: {
        List: [],
    },
    reducers: {
        SetWishList: (state, action) => {
            state.List = action.payload;
        }
    }
})
export const {SetWishList, SetTotal} = wishSlice.actions
export default wishSlice.reducer;