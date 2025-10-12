// src/pages/ManageCategories.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readCategory } from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ManageCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const data = await readCategory();
        setCategories(data || []);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-muted">Manage Categories</h1>

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
                                    <td style={{ width: 80 }}>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() =>
                                                navigate(`/admin/categories/update/${c._id}`)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>

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
        </AdminMasterLayout>
    );
};

export default ManageCategories;
