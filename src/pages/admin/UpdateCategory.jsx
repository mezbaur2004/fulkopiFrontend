// src/pages/UpdateCategory.jsx
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {adminCategoryDetails, updateCategory} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import {ErrorToast, IsEmpty, SuccessToast} from "../../helper/formHelper.js";

const UpdateCategory = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const categoryNameRef = useRef();
    const categoryImgRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        (async () => {
            const data = await adminCategoryDetails(id);
            setCategory(data);
        })();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validation using IsEmpty
        if (IsEmpty(categoryNameRef.current.value)) {
            ErrorToast("Category Name is required");
            return;
        }
        if (IsEmpty(categoryImgRef.current.value)) {
            ErrorToast("Category Image is required");
            return;
        }

        setSubmitting(true);

        const body = {
            categoryName: categoryNameRef.current.value,
            categoryImg: categoryImgRef.current.value,
            status: statusRef.current.value === "true",
        };

        try {
            const res = await updateCategory(id, body);
            if (res?.status === "success") {
                SuccessToast("Category updated successfully!");
                navigate("/admin/categories");
            } else {
                ErrorToast("Failed to update category");
            }
        } catch (err) {
            console.error(err);
            ErrorToast("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    if (!category) return <div className="p-3">Loading...</div>;

    document.title = `Admin | Category | Update`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-muted">Update Category</h1>

                <form onSubmit={handleUpdate} className="row g-3">
                    <div className="col-md-6">
                        <input
                            ref={categoryNameRef}
                            defaultValue={category.categoryName}
                            placeholder="Category Name"
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6">
                        <input
                            ref={categoryImgRef}
                            defaultValue={category.categoryImg}
                            placeholder="Category Image URL"
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6">
                        <select
                            ref={statusRef}
                            defaultValue={category.status ? "true" : "false"}
                            className="form-select text-success"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success mt-3" disabled={submitting}>
                            {submitting ? "Updating..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminMasterLayout>
    );
};

export default UpdateCategory;
