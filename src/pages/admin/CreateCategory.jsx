// src/pages/CreateCategory.jsx
import React, { useRef, useState } from "react";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import { createCategory } from "../../APIRequest/AdminAPIRequest.js";
import {ErrorToast, IsEmpty, SuccessToast} from "../../helper/formHelper.js";

const CreateCategory = () => {
    const [submitting, setSubmitting] = useState(false);

    // refs
    const categoryNameRef = useRef();
    const categoryImgRef = useRef();
    const statusRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const categoryName = categoryNameRef.current?.value || "";
        const categoryImg = categoryImgRef.current?.value || "";
        const status = statusRef.current?.value === "true";

        // Validation using IsEmpty
        if (IsEmpty(categoryNameRef.current.value)) {
            ErrorToast("Category Name is required");
            setSubmitting(false);
            return;
        }
        if (IsEmpty(categoryImgRef.current.value)) {
            ErrorToast("Category Image is required");
            setSubmitting(false);
            return;
        }

        const res = await createCategory(categoryName, categoryImg, status);
        if (res?.status === "success") {
            categoryNameRef.current.value = "";
            categoryImgRef.current.value = "";
            statusRef.current.value = "";
        }

        setSubmitting(false);
    };

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-success">Create Category</h1>

                <form onSubmit={handleSubmit} className="mb-5">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                ref={categoryNameRef}
                                placeholder="Category Name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                ref={categoryImgRef}
                                placeholder="Category Image URL"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <select ref={statusRef} className="form-select text-success">
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success mt-3" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Category"}
                    </button>
                </form>
            </div>
        </AdminMasterLayout>
    );
};

export default CreateCategory;
