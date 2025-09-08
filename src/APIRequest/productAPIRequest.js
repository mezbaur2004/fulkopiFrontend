import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {SetProductList,SetProductDetails} from "../redux/state-slice/product-slice.js";

const url=import.meta.env.VITE_BASE_URL;

export async function productList() {
    try{
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}productlist`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetProductList(res.data.data))
        }else{
            console.log("else")
            store.dispatch(SetProductList([]))
            ErrorToast("No Data Found")
        }

    }catch(error){
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productDetail(id) {
    try {
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}productdetails/${id}`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetProductDetails(res.data.data[0]))
        }else{
            console.log("else")
            store.dispatch(SetProductDetails([]))
            ErrorToast("No Data Found")
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}