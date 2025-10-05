import React, { useEffect, useState, useRef } from "react";
import {
    adminProductDetails,
    updateProduct,
    readBrand,
    readCategory
} from "../../APIRequest/AdminAPIRequest.js";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const UpdateProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // refs
    const titleRef = useRef();
    const desRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const discountPriceRef = useRef();
    const statusRef = useRef();
    const imageRef = useRef();
    const stockRef = useRef();
    const remarksRef = useRef();
    const categoryRef = useRef();
    const brandRef = useRef();

    useEffect(() => {
        (async () => {
            let data = await adminProductDetails(id);
            setProductDetails(data);

            let brandList = await readBrand();
            setBrands(brandList || []);

            let catList = await readCategory();
            setCategories(catList || []);
        })();
    }, [id]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        let body = {
            title: titleRef.current.value,
            des: desRef.current.value,
            price: parseFloat(priceRef.current.value),
            discount: discountRef.current.value === "true", // convert to boolean
            discountPrice: parseFloat(discountPriceRef.current.value) || null,
            status: statusRef.current.value === "true", // convert to boolean
            image: imageRef.current.value,
            stock: stockRef.current.value === "true", // convert to boolean
            remarks: remarksRef.current.value,
            categoryID: categoryRef.current.value,
            brandID: brandRef.current.value,
        };

        let res = await updateProduct(id, body);
        if (res?.status === "success") {
            navigate("/admin/products");
        }
    };

    if (!productDetails) {
        return <div className="p-3">Loading...</div>;
    }

    return (
        <>
            <AdminHeaderComponent/>
        <div className="container p-4">
            <h2 className="mb-4">Update Product</h2>
            <form onSubmit={handleUpdate} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input ref={titleRef} defaultValue={productDetails.title} className="form-control" />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input ref={desRef} defaultValue={productDetails.des} className="form-control" />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Price</label>
                    <input
                        ref={priceRef}
                        type="number"
                        defaultValue={productDetails.price}
                        className="form-control"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Discount</label>
                    <select
                        ref={discountRef}
                        defaultValue={productDetails.discount ? "true" : "false"}
                        className="form-select"
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Discount Price</label>
                    <input
                        ref={discountPriceRef}
                        type="number"
                        defaultValue={productDetails.discountPrice || ""}
                        className="form-control"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Status</label>
                    <select
                        ref={statusRef}
                        defaultValue={productDetails.status ? "true" : "false"}
                        className="form-select"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Stock</label>
                    <select
                        ref={stockRef}
                        defaultValue={productDetails.stock ? "true" : "false"}
                        className="form-select"
                    >
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Remarks</label>
                    <input
                        ref={remarksRef}
                        defaultValue={productDetails.remarks}
                        className="form-control"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Image URL</label>
                    <input
                        ref={imageRef}
                        defaultValue={productDetails.image}
                        className="form-control"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        ref={categoryRef}
                        defaultValue={productDetails.categoryID}
                        className="form-select"
                    >
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Brand</label>
                    <select
                        ref={brandRef}
                        defaultValue={productDetails.brandID}
                        className="form-select"
                    >
                        {brands.map((b) => (
                            <option key={b._id} value={b._id}>
                                {b.brandName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default UpdateProducts;
