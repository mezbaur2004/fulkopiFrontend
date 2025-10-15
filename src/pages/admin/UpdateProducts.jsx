import React, {useEffect, useRef, useState} from "react";
import {adminProductDetails, readBrand, readCategory, updateProduct} from "../../APIRequest/AdminAPIRequest.js";
import {useNavigate, useParams} from "react-router-dom";
import {ErrorToast, SuccessToast} from "../../helper/formHelper.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const UpdateProducts = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // Controlled state for selects
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    // refs for other inputs
    const titleRef = useRef();
    const desRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const discountPriceRef = useRef();
    const statusRef = useRef();
    const imageRef = useRef();
    const stockRef = useRef();
    const remarksRef = useRef();

    // Fetch product details, brands, and categories
    useEffect(() => {
        (async () => {
            const data = await adminProductDetails(id);
            setProductDetails(data);

            const brandList = await readBrand();
            setBrands(brandList || []);

            const catList = await readCategory();
            setCategories(catList || []);

            // Set default select values after data is loaded
            if (data) {
                setSelectedCategory(data.categoryID || (data.category?.[0]?._id || ""));
                setSelectedBrand(data.brandID || (data.brand?._id || ""));
            }
        })();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const body = {
            title: titleRef.current.value,
            des: desRef.current.value,
            price: parseFloat(priceRef.current.value),
            discount: discountRef.current.value === "true",
            discountPrice: parseFloat(discountPriceRef.current.value) || null,
            status: statusRef.current.value === "true",
            image: imageRef.current.value,
            stock: stockRef.current.value === "true",
            remarks: remarksRef.current.value,
            categoryID: selectedCategory,
            brandID: selectedBrand,
        };

        const res = await updateProduct(id, body);
        if (res?.status === "failed") {
            ErrorToast("All required field must be provided");
        }
        if (res?.status === "success") {
            SuccessToast("Product Updated!");
            navigate("/admin/products");
        }
    };

    if (!productDetails) {
        return <div className="p-3">Loading...</div>;
    }

    document.title = `Admin | Product | Update`;

    return (
        <>
            <AdminMasterLayout>
                <div className="container-fluid py-4">
                    <h2 className="mb-4 text-success">Update Product</h2>
                    <form onSubmit={handleUpdate} className="row g-4">
                        {/* Title & Description */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Title</label>
                            <input ref={titleRef} defaultValue={productDetails.title} className="form-control"/>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Description</label>
                            <input ref={desRef} defaultValue={productDetails.des} className="form-control"/>
                        </div>

                        {/* Price, Discount, Discount Price */}
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Price</label>
                            <input
                                ref={priceRef}
                                type="number"
                                defaultValue={productDetails.price}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold">Discount</label>
                            <select
                                ref={discountRef}
                                defaultValue={productDetails.discount ? "true" : "false"}
                                className="form-select text-success"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold">Discount Price</label>
                            <input
                                ref={discountPriceRef}
                                type="number"
                                defaultValue={productDetails.discountPrice || ""}
                                className="form-control"
                            />
                        </div>

                        {/* Status, Stock, Remarks */}
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Status</label>
                            <select
                                ref={statusRef}
                                defaultValue={productDetails.status ? "true" : "false"}
                                className="form-select text-success"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold">Stock</label>
                            <select
                                ref={stockRef}
                                defaultValue={productDetails.stock ? "true" : "false"}
                                className="form-select text-success"
                            >
                                <option value="true">In Stock</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold">Remarks</label>
                            <input ref={remarksRef} defaultValue={productDetails.remarks} className="form-control"/>
                        </div>

                        {/* Image URL */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Image URL</label>
                            <input ref={imageRef} defaultValue={productDetails.image} className="form-control"/>
                        </div>

                        {/* Category & Brand */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="form-select text-success"
                            >
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Brand</label>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="form-select text-success"
                            >
                                {brands.map((b) => (
                                    <option key={b._id} value={b._id}>
                                        {b.brandName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit button */}
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-success">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </AdminMasterLayout>
        </>
    );
};

export default UpdateProducts;
