import React, { useEffect, useRef, useState } from "react";
import { createProduct, readBrand, readCategory } from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const CreateProduct = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Refs
    const titleRef = useRef();
    const desRef = useRef();
    const priceRef = useRef();
    const discountToggleRef = useRef();
    const discountRef = useRef();
    const statusRef = useRef();
    const imageRef = useRef();
    const stockRef = useRef();
    const remarksRef = useRef();
    const brandRef = useRef();
    const categoryRef = useRef();

    useEffect(() => {
        (async () => {
            const brandList = await readBrand();
            setBrands(brandList || []);

            const catList = await readCategory();
            setCategories(catList || []);
        })();
    }, []);

    const resetForm = () => {
        [
            titleRef,
            desRef,
            priceRef,
            discountToggleRef,
            discountRef,
            statusRef,
            imageRef,
            stockRef,
            remarksRef,
            brandRef,
            categoryRef,
        ].forEach((ref) => ref.current && (ref.current.value = ""));
        setShowDiscountInput(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const title = titleRef.current.value;
            const des = desRef.current.value;
            const price = Number(priceRef.current.value);
            const discountBool = discountToggleRef.current.value === "true";
            const discountPrice =
                discountBool && discountRef.current.value ? Number(discountRef.current.value) : null;
            const statusBool = statusRef.current.value === "true";
            const stockBool = stockRef.current.value === "true";
            const image = imageRef.current.value;
            const remarks = remarksRef.current.value;
            const brandID = brandRef.current.value;
            const categoryID = categoryRef.current.value;

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

            resetForm();
        } catch (err) {
            console.error("Create product failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4 text-success">Create Product</h2>
                <form onSubmit={handleSubmit} className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Title</label>
                        <input ref={titleRef} className="form-control" placeholder="Product Title" required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Description</label>
                        <input ref={desRef} className="form-control" placeholder="Description" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold">Price</label>
                        <input ref={priceRef} type="number" className="form-control" placeholder="Price" required />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold">Discount</label>
                        <select
                            ref={discountToggleRef}
                            className="form-select text-success"
                            onChange={(e) => setShowDiscountInput(e.target.value === "true")}
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    {showDiscountInput && (
                        <div className="col-md-4">
                            <label className="form-label fw-bold">Discount Price</label>
                            <input ref={discountRef} type="number" className="form-control" placeholder="Discount Price" />
                        </div>
                    )}

                    <div className="col-md-4">
                        <label className="form-label fw-bold">Status</label>
                        <select ref={statusRef} className="form-select text-success">
                            <option value="">Select Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Image URL</label>
                        <input ref={imageRef} className="form-control" placeholder="Image URL" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Stock</label>
                        <select ref={stockRef} className="form-select text-success">
                            <option value="">Select Stock</option>
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Remarks</label>
                        <input ref={remarksRef} className="form-control" placeholder="Remarks" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Brand</label>
                        <select ref={brandRef} className="form-select text-success">
                            <option value="">Select Brand</option>
                            {brands.map((b) => (
                                <option key={b._id} value={b._id}>
                                    {b.brandName || b.name || b.slug}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Category</label>
                        <select ref={categoryRef} className="form-select text-success">
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.categoryName || c.name || c.slug}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-success" disabled={submitting}>
                            {submitting ? "Creating..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminMasterLayout>
    );
};

export default CreateProduct;
