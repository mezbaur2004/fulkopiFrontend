// src/pages/ManageBrands.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readBrand, createBrand } from "../../APIRequest/AdminAPIRequest.js";
import { ErrorToast} from "../../helper/formHelper.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const ManageBrands = () => {
    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);

    // refs
    const brandNameRef = useRef();
    const brandImgRef = useRef();
    const statusRef = useRef();

    const fetchBrands = async () => {
        const data = await readBrand();
        setBrands(data || []);
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const brandName = brandNameRef.current?.value || "";
        const brandImg = brandImgRef.current?.value || "";
        const status = statusRef.current?.value === "true";

        if (!brandName) {
            ErrorToast("Brand Name required");
            return;
        }

        const res = await createBrand(brandName, brandImg, status);
        if (res?.status === "success") {
            await fetchBrands();
            brandNameRef.current.value = "";
            brandImgRef.current.value = "";
            statusRef.current.value = "";
        }
    };

    return (
        <>
            <AdminHeaderComponent/>

        <div className="container py-4">
            <h1 className="mb-4 text-muted">Manage Brands</h1>

            {/* Add Brand Form */}
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            ref={brandNameRef}
                            placeholder="Brand Name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            ref={brandImgRef}
                            placeholder="Brand Image URL"
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
                    Add Brand
                </button>
            </form>

            {/* Brand List */}
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
                                {/* Edit Button */}
                                <td style={{ width: 80 }}>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => navigate(`/admin/brands/update/${b._id}`)}
                                    >
                                        Edit
                                    </button>
                                </td>

                                {/* Image */}
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
                                        <span className="badge bg-light text-dark">Active</span>
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
        </>
    );
};

export default ManageBrands;
