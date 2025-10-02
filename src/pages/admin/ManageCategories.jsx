// src/pages/ManageCategories.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readCategory, createCategory } from "../../APIRequest/AdminAPIRequest.js";
import { ErrorToast } from "../../helper/formHelper.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const ManageCategories = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    // refs
    const categoryNameRef = useRef();
    const categoryImgRef = useRef();
    const statusRef = useRef();

    const fetchCategories = async () => {
        const data = await readCategory();
        setCategories(data || []);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryName = categoryNameRef.current?.value || "";
        const categoryImg = categoryImgRef.current?.value || "";
        const status = statusRef.current?.value === "true";

        if (!categoryName) {
            ErrorToast("Category Name required");
            return;
        }

        const res = await createCategory(categoryName, categoryImg, status);
        if (res?.status === "success") {
            await fetchCategories();
            categoryNameRef.current.value = "";
            categoryImgRef.current.value = "";
            statusRef.current.value = "";
        }
    };

    return (

        <>
            <AdminHeaderComponent/>

        <div className="container py-4">
            <h1 className="mb-4 text-muted">Manage Categories</h1>

            {/* Add Category Form */}
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            ref={categoryNameRef}
                            placeholder="Category Name"
                            className="form-control"
                            required
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
                        <select ref={statusRef} className="form-select">
                            <option value="">Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Add Category
                </button>
            </form>

            {/* Category List */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>Actions</th>
                        <th>Image</th>
                        <th>Category Name</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((c) => {
                        const active = Boolean(c.status);
                        return (
                            <tr key={c._id}>
                                {/* Edit Button */}
                                <td style={{ width: 80 }}>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => navigate(`/admin/categories/update/${c._id}`)}
                                    >
                                        Edit
                                    </button>
                                </td>

                                {/* Image */}
                                <td className="text-center" style={{ width: 72 }}>
                                    {c.categoryImg ? (
                                        <img
                                            src={c.categoryImg}
                                            alt={c.categoryName}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                borderRadius: "4px",
                                            }}
                                        />
                                    ) : (
                                        "—"
                                    )}
                                </td>

                                <td>{c.categoryName}</td>
                                <td>
                                    {active ? (
                                        <span className="badge bg-light text-dark">Active</span>
                                    ) : (
                                        <span className="badge bg-secondary">Inactive</span>
                                    )}
                                </td>
                                <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"}</td>
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

export default ManageCategories;
