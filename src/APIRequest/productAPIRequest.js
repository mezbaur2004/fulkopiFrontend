import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {
    SetProductList,
    SetProductDetails,
    SetListByKeyword,
    SetListByRemark, SetListByBrand, SetListByCategory, SetBrandList, SetCategoryList
} from "../redux/state-slice/product-slice.js";

const url=import.meta.env.VITE_BASE_URL;

export async function productList() {
    try{
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}productlist`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetProductList(res.data.data))
        }else{
            store.dispatch(SetProductList([]))
            ErrorToast("No Data Found")
        }

    }catch(error){
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productDetail(slug) {
    try {
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}productdetails/${slug}`);
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

export async function productListByKeyword(keyword) {
    try {
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}listbykeyword/${keyword}`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetListByKeyword(res.data.data))
        }else{
            store.dispatch(SetListByKeyword([]))
        }
    }catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productListByRemarks(remarks) {
    try {
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}listbyremark/${remarks}`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetListByRemark(res.data.data))
        }else{
            store.dispatch(SetListByRemark([]))
        }
    }catch (error) {
        console.log(error.toString())
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productListByBrand(brandID) {
    try {
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}listbybrand/${brandID}`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetListByBrand(res.data.data))
        }else{
            store.dispatch(SetListByBrand([]))
        }
    }catch (error) {
        console.log(error.toString())
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productListByCategory(categoryID) {
    try {
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}listbycategory/${categoryID}`);
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetListByCategory(res.data.data))
        }else{
            store.dispatch(SetListByCategory([]))
        }
    }catch (error) {
        console.log(error.toString())
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function brandList(){
    try{
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}brandlist`)
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetBrandList(res.data.data))
        }else{
            store.dispatch(SetBrandList([]))
        }
    }catch (error) {
        console.log(error.toString())
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function categoryList(){
    try{
        store.dispatch(ShowLoader())
        let res= await axios.get(`${url}categorylist`)
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetCategoryList(res.data.data))
        }else{
            store.dispatch(SetCategoryList([]))
        }
    }catch (error) {
        console.log(error.toString())
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

