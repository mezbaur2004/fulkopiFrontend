import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {getToken} from "../helper/sessionHelper.js";
import {SetCartList, SetTotal} from "../redux/state-slice/cart-slice.js";

const url = import.meta.env.VITE_BASE_URL;
const AxiosHeader = {headers: {"token": getToken()}}

export async function getCartList() {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}cartlist`, AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetCartList(res.data.data))
            const cartItems = res.data.data;

            // 1️⃣ Total quantity
            const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
            store.dispatch(SetTotal(totalQty));
        } else {
            store.dispatch(SetCartList([]))
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function addToCart(productId, qty) {
    try {
        store.dispatch(ShowLoader())
        let postBody = {productID: productId, qty: qty};
        let res = await axios.post(`${url}addtocart`, postBody, AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            SuccessToast("Product Added Successfully")
            await getCartList()
        } else {
            ErrorToast("Something Went Wrong")
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function removeFromCart(_id) {
    try {
        store.dispatch(ShowLoader())
        let postBody = {_id};
        let res = await axios.delete(`${url}removecart`, {data: postBody, ...AxiosHeader})
        store.dispatch(HideLoader())
        if (res.status === 200) {
            SuccessToast("Product Removed Successfully")
            await getCartList()
        } else {
            ErrorToast("Something Went Wrong")
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
