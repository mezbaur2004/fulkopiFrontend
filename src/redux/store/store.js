import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../state-slice/product-slice.js";
import settingsReducer from "../state-slice/settings-slice.js";

export default configureStore({
    reducer: {
        settings:settingsReducer,
        products:productReducer,

    }
})