import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast} from "../helper/formHelper.js";
import {
    SetBrandList,
    SetCategoryList,
    SetListByBrand,
    SetListByCategory,
    SetListByKeyword,
    SetListByRemark,
    SetProductDetails,
    SetProductList
} from "../redux/state-slice/product-slice.js";

const url = import.meta.env.VITE_BASE_URL;

export async function productList(page = 1, limit = 80) {
    try {
        store.dispatch(ShowLoader());
        let res = await axios.get(`${url}productlist?page=${page}&limit=${limit}`);
        store.dispatch(HideLoader());

        if (res.status === 200 && res.data.status === "success") {
            store.dispatch(SetProductList(res.data.data));
            return res.data.pagination;
        } else {
            store.dispatch(SetProductList([]));
            ErrorToast("No Data Found");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}


export async function productDetail(slug) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}productdetails/${slug}`);
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetProductDetails(res.data.data[0]))
        } else {
            store.dispatch(SetProductDetails([]))
            ErrorToast("No Data Found")
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productListByKeyword(keyword) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}listbykeyword/${keyword}`);
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetListByKeyword(res.data.data))
        } else {
            store.dispatch(SetListByKeyword([]))
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productListByRemarks(remarks) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}listbyremark/${remarks}`);
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetListByRemark(res.data.data))
        } else {
            store.dispatch(SetListByRemark([]))
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function productListByBrand(brandID, page = 1, limit = 4) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}listbybrand/${brandID}?page=${page}&limit=${limit}`);
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data.status === "success") {
            store.dispatch(SetListByBrand(res.data.data));
            return res.data.pagination;
        } else {
            store.dispatch(SetListByBrand([]))
            ErrorToast("No Data Found");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return null;
    }
}

export async function productListByCategory(categoryID, page = 1, limit = 4) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}listbycategory/${categoryID}?page=${page}&limit=${limit}`);
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data.status === "success") {
            store.dispatch(SetListByCategory(res.data.data))
            return res.data.pagination;
        } else {
            store.dispatch(SetListByCategory([]))
            ErrorToast("No Data Found");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return null;
    }
}

export async function brandList() {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}brandlist`)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetBrandList(res.data.data))
        } else {
            store.dispatch(SetBrandList([]))
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function categoryList() {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}categorylist`)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetCategoryList(res.data.data))
        } else {
            store.dispatch(SetCategoryList([]))
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

