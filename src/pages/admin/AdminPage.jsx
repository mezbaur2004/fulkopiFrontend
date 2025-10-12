// src/pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const dashboardItems = [
    { label: "Manage Products", path: "/admin/products", color: "success" },
    { label: "Manage Brands", path: "/admin/brands", color: "primary" },
    { label: "Manage Categories", path: "/admin/categories", color: "warning" },
    { label: "View Users", path: "/admin/userlist", color: "info" },
    { label: "View Invoices", path: "/admin/invoicelist", color: "secondary" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <AdminMasterLayout>
            <div className="container py-5">
                <h1 className="mb-4 text-success">Admin Dashboard</h1>

                {/* Homepage button */}
                <div className="mb-4">
                    <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/")}
                    >
                        ← Go to Homepage
                    </button>
                </div>

                {/* Dashboard grid */}
                <div className="row g-4">
                    {dashboardItems.map((item, idx) => (
                        <div key={idx} className="col-md-4">
                            <div
                                className={`card border-${item.color} shadow-sm h-100`}
                                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                onClick={() => navigate(item.path)}
                            >
                                <div className={`card-body text-${item.color} d-flex flex-column justify-content-center align-items-center`}>
                                    <h5 className="card-title">{item.label}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminMasterLayout>
    );
};

export default AdminDashboard;
