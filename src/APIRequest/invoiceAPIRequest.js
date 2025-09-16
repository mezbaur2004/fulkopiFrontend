import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {getToken} from "../helper/sessionHelper.js";
import {SetCartList, SetTotal} from "../redux/state-slice/cart-slice.js";
import {SetInvoiceList, SetInvoiceProductList} from "../redux/state-slice/invoice-slice.js";

const url=import.meta.env.VITE_BASE_URL;
const AxiosHeader={headers:{"token":getToken()}}

export async function createInvoice(cus_name, cus_location, cus_city, cus_phone, cus_postcode) {
    try{
        store.dispatch(ShowLoader())
        let postBody={cus_name, cus_location, cus_city, cus_phone, cus_postcode};
        let res=await axios.post(`${url}createinvoice`,postBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("Redirecting to SSLCommerz Payment Gateway")
            console.log(res.data.redirectGatewayURL)
            return res.data.redirectGatewayURL;
        }else{
            ErrorToast("Something Went Wrong")
        }
    }catch (error){
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function invoiceList(){
    try{
        store.dispatch(ShowLoader())
        let res=await axios.get(`${url}invoicelist`,AxiosHeader)
        store.dispatch(HideLoader())
        console.log(res.data.data)
        if(res.status === 200){
            store.dispatch(SetInvoiceList(res.data.data))
        }else{
            store.dispatch(SetInvoiceList([]))
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function invoiceProductList(invoiceID){
    try{
        store.dispatch(ShowLoader())
        let res=await axios.get(`${url}invoiceproductlist/${invoiceID}`,AxiosHeader)
        store.dispatch(HideLoader())
        console.log(res.data.data)
        if(res.status === 200){
            store.dispatch(SetInvoiceProductList(res.data.data))
        }else{
            store.dispatch(SetInvoiceProductList([]))
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}