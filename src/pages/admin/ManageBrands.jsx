// src/pages/ManageBrands.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readBrand } from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ManageBrands = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
        const data = await readBrand();
        setBrands(data || []);
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-success">Manage Brands</h1>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>Actions</th>
                            <th>Image</th>
                            <th>Brand Name</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {brands.map((b) => {
                            const active = Boolean(b.status);
                            return (
                                <tr key={b._id}>
                                    <td style={{ width: 80 }}>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => navigate(`/admin/brands/update/${b._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </td>

                                    <td className="text-center" style={{ width: 72 }}>
                                        {b.brandImg ? (
                                            <img
                                                src={b.brandImg}
                                                alt={b.brandName}
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

                                    <td>{b.brandName}</td>
                                    <td>
                                        {active ? (
                                            <span className="badge bg-success">Active</span>
                                        ) : (
                                            <span className="badge bg-secondary">Inactive</span>
                                        )}
                                    </td>
                                    <td>{b.createdAt ? new Date(b.createdAt).toLocaleString() : "—"}</td>
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

export default ManageBrands;
