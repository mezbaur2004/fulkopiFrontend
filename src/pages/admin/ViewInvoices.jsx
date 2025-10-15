// src/pages/ViewInvoices.jsx
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {invoiceList} from "../../APIRequest/AdminAPIRequest.js";
import {ErrorToast} from "../../helper/formHelper.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    const navigate = useNavigate();

    const fetchInvoices = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const fullData = await invoiceList(pageNumber, limit);
            setInvoices(fullData.data || []);
            if (fullData.pagination?.totalPages) {
                setTotalPages(fullData.pagination.totalPages);
                setPage(fullData.pagination.page);
            }
        } catch (err) {
            console.log(err);
            ErrorToast("Could not load invoices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices(page);
    }, [page]);

    const renderPagination = () => {
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
                    className={`btn ${i === page ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
                <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    « Prev
                </button>
                {pages}
                <button
                    className="btn btn-outline-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next »
                </button>
            </div>
        );
    };

    document.title = `Admin | Invoices`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4">All Invoices</h2>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>Actions</th>
                            <th>Tran ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Location</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={10} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : invoices.length > 0 ? (
                            invoices.map((inv) => (
                                <tr key={inv._id}>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/invoicelist/invoiceproductlist/${inv._id}`
                                                )
                                            }
                                        >
                                            View Products
                                        </button>
                                    </td>
                                    <td>{inv.tran_id}</td>
                                    <td>{inv.customerName}</td>
                                    <td>{inv.user?.email || "—"}</td>
                                    <td>
                                            <span
                                                className={`badge ${
                                                    inv.user?.role === "admin"
                                                        ? "bg-danger"
                                                        : "bg-secondary"
                                                }`}
                                            >
                                                {inv.user?.role || "user"}
                                            </span>
                                    </td>
                                    <td>{inv.location || "—"}</td>
                                    <td>{inv.total}</td>
                                    <td>
                                            <span
                                                className={`badge ${
                                                    inv.paymentStatus === "success"
                                                        ? "bg-success"
                                                        : inv.paymentStatus === "pending"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                }`}
                                            >
                                                {inv.paymentStatus}
                                            </span>
                                    </td>
                                    <td style={{whiteSpace: "nowrap"}}>
                                        {inv.createdAt || inv.createdDate
                                            ? new Date(inv.createdAt || inv.createdDate).toLocaleString(
                                                "en-GB",
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )
                                            : "—"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="text-center text-muted">
                                    No Invoices Found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && renderPagination()}
            </div>
        </AdminMasterLayout>
    );
};

export default ViewInvoices;
