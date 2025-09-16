import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {getToken} from "../helper/sessionHelper.js";
import {
    SetWishList
} from "../redux/state-slice/wish-slice.js";

const url=import.meta.env.VITE_BASE_URL;
const AxiosHeader={headers:{"token":getToken()}}

export async function getWishList(){
    try {
        store.dispatch(ShowLoader())
        let res=await axios.get(`${url}wishlist`,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetWishList(res.data.data))
        }else{
            store.dispatch(SetWishList([]))
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function addToWish(productId){
    try {
        store.dispatch(ShowLoader())
        let postBody={productID:productId,};
        let res=await axios.post(`${url}addwishlist`,postBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status === 200){
            await getWishList()
            SuccessToast("Product Added Successfully")
        }else{
            ErrorToast("Something Went Wrong")
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function removeFromWish(_id) {
    try {
        store.dispatch(ShowLoader())
        let postBody={_id};
        let res=await axios.delete(`${url}removewish`,{data:postBody,...AxiosHeader})
        store.dispatch(HideLoader())
        if(res.status === 200){
            await getWishList()
            SuccessToast("Product Removed Successfully")
        }else{
            ErrorToast("Something Went Wrong")
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}