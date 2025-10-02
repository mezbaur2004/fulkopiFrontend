import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeaderComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-dark text-white p-3">
            <div className="container text-center">
                <button
                    onClick={() => navigate("/admin")}
                    className="btn btn-primary w-100 fs-5 py-2"
                >
                    Admin Dashboard
                </button>
            </div>
        </div>
    );
};

export default AdminHeaderComponent;
