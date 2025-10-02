// src/pages/ManageProducts.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, readProduct, readBrand, readCategory } from "../../APIRequest/AdminAPIRequest.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const ManageProducts = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDiscountInput, setShowDiscountInput] = useState(false);

    // refs for form inputs
    const titleRef = useRef();
    const desRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef(); // discountPrice input
    const discountToggleRef = useRef(); // true/false select for discount
    const statusRef = useRef(); // true/false select
    const imageRef = useRef();
    const stockRef = useRef(); // true/false select
    const remarksRef = useRef();
    const categoryRef = useRef();
    const brandRef = useRef();

    const fetchProducts = async () => {
        const data = await readProduct();
        setProducts(data || []);
    };

    const fetchBrands = async () => {
        try {
            const data = await readBrand();
            setBrands(data || []);
        } catch (err) {
            console.error("readBrand failed", err);
            setBrands([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await readCategory();
            setCategories(data || []);
        } catch (err) {
            console.error("readCategory failed", err);
            setCategories([]);
        }
    };

    useEffect(() => {
        (async () => {
            await Promise.all([fetchProducts(), fetchBrands(), fetchCategories()]);
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // parse values
        const title = titleRef.current?.value || "";
        const des = desRef.current?.value || "";
        const price = Number(priceRef.current?.value || 0);

        const discountToggleValue = discountToggleRef.current?.value;
        const discountBool = discountToggleValue === "true";

        const discountPriceRaw = discountRef.current?.value;
        const discountPrice =
            discountBool && discountPriceRaw !== "" && discountPriceRaw !== undefined
                ? Number(discountPriceRaw)
                : null;

        const statusBool = statusRef.current?.value === "true";
        const stockBool = stockRef.current?.value === "true";
        const image = imageRef.current?.value || "";
        const remarks = remarksRef.current?.value || "";
        const categoryID = categoryRef.current?.value || "";
        const brandID = brandRef.current?.value || "";

        // Call API: createProduct(title, des, price, discount, discountPrice, status, image, stock, remarks, categoryID, brandID)
        await createProduct(
            title,
            des,
            price,
            discountBool,
            discountPrice,
            statusBool,
            image,
            stockBool,
            remarks,
            categoryID,
            brandID
        );

        await fetchProducts();

        // Reset form fields (including selects)
        [
            titleRef,
            desRef,
            priceRef,
            discountRef,
            discountToggleRef,
            statusRef,
            imageRef,
            stockRef,
            remarksRef,
            categoryRef,
            brandRef,
        ].forEach((ref) => {
            if (ref?.current) ref.current.value = "";
        });

        setShowDiscountInput(false);
    };

    // show discount price column if any product has discount true or discountPrice present
    const hasDiscountColumn = products.some((p) => {
        if (p?.discount === true) return true;
        if (p?.discountPrice !== undefined && p.discountPrice !== null) {
            const n = Number(p.discountPrice);
            return !Number.isNaN(n) && n > 0;
        }
        return false;
    });

    // helpers for safe label extraction (some objects might use brandName/categoryName)
    const brandLabel = (b) => b?.brandName || b?.name || b?.slug || "Unknown";
    const categoryLabel = (c) => c?.categoryName || c?.name || c?.slug || "Unknown";

    return (
        <>
            <AdminHeaderComponent/>

        <div className="container py-4">
            <h1 className="mb-4 text-muted">Manage Products</h1>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input ref={titleRef} placeholder="Title" className="form-control" required />
                    </div>

                    <div className="col-md-6">
                        <input ref={desRef} placeholder="Description" className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <input ref={priceRef} type="number" placeholder="Price" className="form-control" required />
                    </div>

                    {/* Discount toggle (true/false) */}
                    <div className="col-md-4">
                        <select
                            ref={discountToggleRef}
                            className="form-select"
                            onChange={(e) => setShowDiscountInput(e.target.value === "true")}
                        >
                            <option value="">Discount?</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    {/* Discount price: shown only when discount toggle = true */}
                    <div className="col-md-4">
                        <input
                            ref={discountRef}
                            type="number"
                            placeholder="Discount Price (optional)"
                            className="form-control"
                            style={{ display: showDiscountInput ? "block" : "none" }}
                        />
                    </div>

                    <div className="col-md-4">
                        <select ref={statusRef} className="form-select">
                            <option value="">Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input ref={imageRef} placeholder="Image URL" className="form-control" />
                    </div>

                    <div className="col-md-6">
                        <select ref={stockRef} className="form-select">
                            <option value="">Stock</option>
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input ref={remarksRef} placeholder="Remarks" className="form-control" />
                    </div>

                    {/* Brand select */}
                    <div className="col-md-6">
                        <select ref={brandRef} className="form-select">
                            <option value="">Select Brand</option>
                            {brands.map((b) => (
                                <option key={b._id} value={b._id}>
                                    {brandLabel(b)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category select */}
                    <div className="col-md-6">
                        <select ref={categoryRef} className="form-select">
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {categoryLabel(c)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Add Product
                </button>
            </form>

            {/* Product List */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Actions</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        {hasDiscountColumn && <th scope="col">Discount Price</th>}
                        <th scope="col">Discount</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Status</th>
                        <th scope="col">Remarks</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                    </tr>
                    </thead>

                    <tbody>
                    {products.map((p) => {
                        const discountPrice =
                            p?.discountPrice !== undefined && p.discountPrice !== null ? Number(p.discountPrice) : null;

                        const hasDiscount =
                            Boolean(p.discount === true) || (discountPrice !== null && !Number.isNaN(discountPrice) && discountPrice > 0);
                        const inStock = Boolean(p.stock);
                        const active = Boolean(p.status);

                        return (
                            <tr key={p._id}>
                                {/* EDIT BUTTON FIRST */}
                                <td style={{ width: 80 }}>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => navigate(`/admin/products/update/${p._id}`)}
                                    >
                                        Edit
                                    </button>
                                </td>

                                {/* IMAGE */}
                                <td className="text-center" style={{ width: 72 }}>
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                </td>

                                <td style={{ maxWidth: 220 }}>{p.title}</td>

                                <td style={{ maxWidth: 360, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {p.des}
                                </td>

                                <td>
                                    {hasDiscount && discountPrice ? (
                                        <span>
                        <span className="text-muted text-decoration-line-through me-2">{p.price}</span>
                                            {/*<span className="fw-bold text-danger">{discountPrice}</span>*/}
                    </span>
                                    ) : (
                                        <span>{p.price}</span>
                                    )}
                                </td>

                                {hasDiscountColumn && <td>{hasDiscount && discountPrice ? discountPrice : "—"}</td>}

                                <td>
                                    {hasDiscount ? (
                                        <span className="badge bg-warning text-dark">Yes</span>
                                    ) : (
                                        <span className="badge bg-light text-dark">No</span>
                                    )}
                                </td>

                                <td>{inStock ? <span className="badge bg-success">In Stock</span> : <span className="badge bg-danger">Out of Stock</span>}</td>
                                <td>{active ? <span className="badge bg-light text-dark">Active</span> : <span className="badge bg-secondary">Inactive</span>}</td>
                                <td>{p.remarks || "—"}</td>
                                <td>{p.brand?.brandName || p.brand?.name || p.brand?.slug || "—"}</td>
                                <td>{p.category?.categoryName || p.category?.name || p.category?.slug || "—"}</td>
                                <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</td>
                                <td>{p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "—"}</td>
                            </tr>
                        );
                    })}
                    </tbody>

                </table>
            </div>
        </div>
        </>
    );
};

export default ManageProducts;
