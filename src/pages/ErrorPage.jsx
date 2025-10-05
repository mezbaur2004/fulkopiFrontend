import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3 text-dark">Oops! Page Not Found</h2>
            <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
                The page you’re looking for doesn’t exist, was moved, or is temporarily unavailable.
            </p>
            <button
                className="btn btn-primary btn-lg px-4"
                onClick={() => navigate("/")}
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default ErrorPage;
