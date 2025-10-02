// src/pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            {/* Homepage Button */}
            <button
                onClick={() => navigate("/")}
                className="homepage-button"
            >
                Go to Homepage
            </button>

            <div className="dashboard-grid">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="dashboard-button"
                >
                    Manage Products
                </button>

                <button
                    onClick={() => navigate("/admin/brands")}
                    className="dashboard-button"
                >
                    Manage Brands
                </button>

                <button
                    onClick={() => navigate("/admin/categories")}
                    className="dashboard-button"
                >
                    Manage Categories
                </button>

                <button
                    onClick={() => navigate("/admin/userlist")}
                    className="dashboard-button"
                >
                    View Users
                </button>

                <button
                    onClick={() => navigate("/admin/invoicelist")}
                    className="dashboard-button"
                >
                    View Invoices
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
