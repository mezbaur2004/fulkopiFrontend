import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {readProduct} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ManageProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const fullData = await readProduct(pageNumber, limit);
            if (fullData?.data) {
                setProducts(fullData?.data);
                setTotalPages(fullData?.pagination?.totalPages || 1);
                setPage(fullData?.pagination?.page || 1);
            } else {
                setProducts([]);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const hasDiscountColumn = products.some(
        (p) => p?.discount === true || (!!p?.discountPrice && p.discountPrice > 0)
    );

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

    document.title = `Admin | Products`;

    return (
        <AdminMasterLayout>
            <div className="container-fluid">
                <h2 className="mb-4 text-success">Manage Products</h2>

                {loading ? (
                    <p className="text-center text-muted">Loading...</p>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered align-middle text-nowrap">
                                <thead className="table-dark">
                                <tr>
                                    <th>Actions</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    {hasDiscountColumn && <th>DisPrice</th>}
                                    <th>Discount</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.length > 0 ? (
                                    products.map((p) => {
                                        const discountPrice = p.discountPrice ?? null;
                                        const hasDiscount = p.discount || (discountPrice > 0);
                                        return (
                                            <tr key={p._id}>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(`/admin/products/update/${p._id}`)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                                <td>
                                                    <img
                                                        src={p.image}
                                                        alt={p.title}
                                                        className="img-thumbnail"
                                                        style={{width: 50, height: 50}}
                                                    />
                                                </td>
                                                <td style={{
                                                    whiteSpace: "normal",
                                                    wordWrap: "break-word",
                                                    maxWidth: "200px"
                                                }}>
                                                    {p.title || "—"}
                                                </td>

                                                <td style={{
                                                    whiteSpace: "normal",
                                                    wordWrap: "break-word",
                                                    maxWidth: "250px"
                                                }}>
                                                    {p.des || "—"}
                                                </td>

                                                <td>
                                                    {hasDiscount && discountPrice ? (
                                                        <>
                                                                <span className="text-decoration-line-through me-2">
                                                                    {p.price}
                                                                </span>

                                                        </>
                                                    ) : (
                                                        p.price
                                                    )}
                                                </td>
                                                {hasDiscountColumn && <td>{hasDiscount ? discountPrice : "—"}</td>}
                                                <td>
                                                        <span
                                                            className={`badge ${
                                                                hasDiscount
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-light text-dark"
                                                            }`}
                                                        >
                                                            {hasDiscount ? "Yes" : "No"}
                                                        </span>
                                                </td>
                                                <td>
                                                        <span
                                                            className={`badge ${
                                                                p.stock ? "bg-success" : "bg-danger"
                                                            }`}
                                                        >
                                                            {p.stock ? "In Stock" : "Out of Stock"}
                                                        </span>
                                                </td>
                                                <td>
                                                        <span
                                                            className={`badge ${
                                                                p.status
                                                                    ? "bg-light text-dark"
                                                                    : "bg-secondary"
                                                            }`}
                                                        >
                                                            {p.status ? "Active" : "Inactive"}
                                                        </span>
                                                </td>
                                                <td style={{
                                                    whiteSpace: "normal",
                                                    wordWrap: "break-word",
                                                    maxWidth: "180px"
                                                }}>
                                                    {p.remarks || "—"}
                                                </td>

                                                <td>{p.brand?.brandName || "—"}</td>
                                                <td style={{
                                                    whiteSpace: "normal",
                                                    wordWrap: "break-word",
                                                    maxWidth: "200px"
                                                }}>
                                                    {p.category?.categoryName || "—"}
                                                </td>

                                                <td style={{whiteSpace: "nowrap"}}>
                                                    {p.createdAt
                                                        ? new Date(p.createdAt).toLocaleString("en-GB", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                        : "—"}
                                                </td>

                                                <td style={{whiteSpace: "nowrap"}}>
                                                    {p.updatedAt
                                                        ? new Date(p.updatedAt).toLocaleString("en-GB", {
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
                                        <td colSpan="14" className="text-center text-muted">
                                            No Products Found
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

export default ManageProducts;
