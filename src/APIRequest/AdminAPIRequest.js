import axios from "axios";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {getToken} from "../helper/sessionHelper.js";

const url = import.meta.env.VITE_BASE_URL;
const AxiosHeader = {headers: {"token": getToken()}}


//brand---------------------------------------------------------------------

export async function createProduct(title, des, price, discount, discountPrice, status, image, stock, remarks, categoryID, brandID) {
    try {
        store.dispatch(ShowLoader())
        let postBody = {
            title,
            des,
            price,
            discount,
            discountPrice: discount ? discountPrice : "",
            status,
            image,
            stock,
            remarks,
            categoryID,
            brandID
        };
        let res = await axios.post(`${url}productcreate`, postBody, AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            SuccessToast("New Product Added!")
        } else {
            ErrorToast("Something Went Wrong")
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}


export async function readProduct(page = 1, limit = 8) {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(`${url}adminproductlist?page=${page}&limit=${limit}`, AxiosHeader);
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data.status === "success") {
            return res.data;
        } else {
            ErrorToast("Something Went Wrong");
            return [];
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return [];
    }
}

export async function adminProductDetails(id) {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(`${url}adminproductdetails/${id}`, AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            return res.data.data[0];
        } else {
            ErrorToast("Something Went Wrong")
            return [];
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return [];
    }
}


export async function updateProduct(id, postBody) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.put(`${url}productupdate/${id}`, postBody, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data;
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}

//brand---------------------------------------------------------------------

export async function readBrand() {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(`${url}adminbrandlist`, AxiosHeader);
        store.dispatch(HideLoader())
        if (res.status === 200) {
            return res.data.data;
        } else {
            ErrorToast("Something Went Wrong");
            return [];
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return [];
    }
}

export async function createBrand(brandName, brandImg, status) {
    try {
        store.dispatch(ShowLoader());
        const PostBody = {brandName, brandImg, status};
        const res = await axios.post(`${url}brandcreate`, PostBody, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200 && res.data.status !== "fail") {
            SuccessToast("New Brand Added!");
            return res.data; // <-- return full data object
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}

export async function adminBrandDetails(id) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}adminbranddetails/${id}`, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data.data; // <-- this is an object, not an array
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}

export async function updateBrand(id, postBody) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.put(`${url}brandupdate/${id}`, postBody, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            SuccessToast("Brand Updated!");
            return res.data; // contains status and possibly updated brand
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}


//category---------------------------------------------------------------------


export async function readCategory() {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(`${url}admincategorylist`, AxiosHeader);
        store.dispatch(HideLoader())
        if (res.status === 200) {
            return res.data.data;
        } else {
            ErrorToast("Something Went Wrong");
            return [];
        }
    } catch (error) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return [];
    }
}


export async function createCategory(categoryName, categoryImg, status) {
    try {
        store.dispatch(ShowLoader());
        const PostBody = {categoryName, categoryImg, status};
        const res = await axios.post(`${url}categorycreate`, PostBody, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200 && res.data.status !== "fail") {
            SuccessToast("New Category Added!");
            return res.data; // <-- return full data object
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}


export async function adminCategoryDetails(id) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}admincategorydetails/${id}`, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data.data; // object, not array
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}

export async function updateCategory(id, postBody) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.put(`${url}categoryupdate/${id}`, postBody, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            SuccessToast("Category Updated!");
            return res.data; // contains status and updated category
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}


//users---------------------------------------------------------------------

export async function userlist(page = 1, limit = 2) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}userlist?page=${page}&limit=${limit}`, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data;
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}

export async function userInvoice(id) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}oneuserinvoicelist/${id}`, AxiosHeader)
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data.data;
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        ErrorToast("Something Went Wrong");
        store.dispatch(HideLoader());
        return null;
    }
}

//invoices---------------------------------------------------------------------

export async function invoiceList(page = 1, limit = 8) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}userinvoicelist?page=${page}&limit=${limit}`, AxiosHeader);
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data;
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }

    } catch (error) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return null;
    }
}

export async function invoiceDetails(id) {
    try {
        store.dispatch(ShowLoader());
        const res = await axios.get(`${url}invoiceproducts/${id}`, AxiosHeader)
        store.dispatch(HideLoader());
        if (res.status === 200) {
            return res.data.data;
        } else {
            ErrorToast("Something Went Wrong");
            return null;
        }
    } catch (error) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return null;
    }
}