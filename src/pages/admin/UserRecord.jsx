// src/pages/UserRecord.jsx
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {userInvoice} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const UserRecord = () => {
    const {id} = useParams(); // user id
    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await userInvoice(id);
            setInvoices(Array.isArray(data) ? data : []);
            setLoading(false);
        })();
    }, [id]);

    const statusBadge = (status) => {
        if (!status) return <span className="badge bg-secondary">Unknown</span>;
        const s = String(status).toLowerCase();
        if (s === "success") return <span className="badge bg-success">Success</span>;
        if (s === "pending") return <span className="badge bg-warning text-dark">Pending</span>;
        if (s === "fail" || s === "failed") return <span className="badge bg-danger">Failed</span>;
        return <span className="badge bg-secondary">{status}</span>;
    };

    document.title = `Admin | User | Invoices`;

    return (
        <>
            <AdminMasterLayout>
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">User Invoices</h3>
                        <div>
                            <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>
                                Back
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate("/admin/userlist")}>
                                Users List
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-4">Loading...</div>
                    ) : invoices.length === 0 ? (
                        <div className="alert alert-info">No invoices found for this user.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered align-middle">
                                <thead className="table-dark">
                                <tr>
                                    <th>Action</th>
                                    <th>Tran ID</th>
                                    <th>Customer</th>
                                    <th>Location</th>
                                    <th>Delivery</th>
                                    <th>Total</th>
                                    <th>Payment Status</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoices.map((inv) => (
                                    <tr key={inv._id}>
                                        {/* ✅ Action Button */}
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => navigate(`/admin/userlist/invoicelist/invoiceproductlist/${inv._id}`)}
                                            >
                                                View Products
                                            </button>
                                        </td>

                                        <td style={{minWidth: 140}}>{inv.tran_id || "—"}</td>
                                        <td>{inv.customerName || "—"}</td>
                                        <td style={{
                                            maxWidth: 300,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}>
                                            {inv.location || "—"}
                                        </td>
                                        <td>{typeof inv.deliveryCharge === "number" ? inv.deliveryCharge : inv.deliveryCharge || "—"}</td>
                                        <td>{typeof inv.total === "number" ? inv.total : inv.total || "—"}</td>
                                        <td>{statusBadge(inv.paymentStatus)}</td>
                                        <td style={{whiteSpace: "nowrap"}}>
                                            {inv.createdAt ? new Date(inv.createdAt).toLocaleString() : "—"}
                                        </td>
                                        <td style={{whiteSpace: "nowrap"}}>
                                            {inv.updatedAt ? new Date(inv.updatedAt).toLocaleString() : "—"}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </AdminMasterLayout>
        </>
    );
};

export default UserRecord;
