import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        List: [],
    },
    reducers: {
        SetUserList: (state, action) => {
            state.List = action.payload;
        }
    }
})
export const {SetUserList} = userSlice.actions
export default userSlice.reducer;