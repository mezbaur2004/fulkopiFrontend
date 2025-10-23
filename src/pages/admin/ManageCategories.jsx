import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readCategory } from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ManageCategories = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const fullData = await readCategory(pageNumber, limit);
            const categoryData = fullData?.data || [];
            const paginationData = fullData?.pagination || {};
            setCategories(categoryData);
            setTotalPages(paginationData.totalPages || 1);
            setPage(paginationData.page || 1);
        } catch (error) {
            console.error(error);
            setCategories([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(page);
    }, [page]);

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn btn-sm ${i === page ? "btn-success" : "btn-outline-success"} me-1`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="d-flex justify-content-center mt-3 mb-4">
                <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>
                {pages}
                <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        );
    };

    document.title = `Admin | Categories`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-success">Manage Categories</h1>

                {loading ? (
                    <p className="text-center text-muted">Loading...</p>
                ) : (
                    <>
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
                                {categories.length ? (
                                    categories.map((c) => {
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
                                                <td style={{ whiteSpace: "nowrap" }}>
                                                    {c.createdAt
                                                        ? new Date(c.createdAt).toLocaleString("en-GB", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                        : "—"}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center text-danger py-4">
                                            No Categories Found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {renderPagination()}
                    </>
                )}
            </div>
        </AdminMasterLayout>
    );
};

export default ManageCategories;
