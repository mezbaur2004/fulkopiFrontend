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

export async function productListByKeyword(keyword, page = 1, limit = 8) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}listbykeyword/${encodeURIComponent(keyword)}?page=${page}&limit=${limit}`);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            store.dispatch(SetListByKeyword(res.data.data));
            return res.data.pagination
        } else {
            store.dispatch(SetListByKeyword([]));
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}


export async function productListByRemarks(remarks, page = 1, limit = 8) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(
            `${url}listbyremark/${encodeURIComponent(remarks)}?page=${page}&limit=${limit}`
        );
        store.dispatch(HideLoader());
        if (res.status === 200) {
            store.dispatch(SetListByRemark(res.data.data));
            return res.data.pagination;
        } else {
            store.dispatch(SetListByRemark([]));
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}


export async function productListByBrand(slug, page = 1, limit = 4) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}listbybrand/${slug}?page=${page}&limit=${limit}`);
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

export async function productListByCategory(slug, page = 1, limit = 4) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}listbycategory/${slug}?page=${page}&limit=${limit}`);
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

export async function brandList(page=1,limit=4) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}brandlist?page=${page}&limit=${limit}`)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetBrandList(res.data.data))
            return res.data.pagination;
        } else {
            store.dispatch(SetBrandList([]))
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return null;
    }
}

export async function categoryList(page=1, limit=4) {
    try {
        store.dispatch(ShowLoader())
        let res = await axios.get(`${url}categorylist?page=${page}&limit=${limit}`)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            store.dispatch(SetCategoryList(res.data.data))
            return res.data.pagination;
        } else {
            store.dispatch(SetCategoryList([]))
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return null;
    }
}

