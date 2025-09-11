import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../state-slice/product-slice.js";
import settingsReducer from "../state-slice/settings-slice.js";
import cartReducer from "../state-slice/cart-slice.js";
import wishReducer from "../state-slice/wish-slice.js";

export default configureStore({
    reducer: {
        settings:settingsReducer,
        products:productReducer,
        carts:cartReducer,
        wishes: wishReducer,
    }
})