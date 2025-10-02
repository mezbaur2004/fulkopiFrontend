// src/pages/ViewInvoices.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { invoiceList } from "../../APIRequest/AdminAPIRequest.js";
import { ErrorToast } from "../../helper/formHelper.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    const fetchInvoices = async () => {
        const data = await invoiceList();
        if (data) {
            setInvoices(data);
        } else {
            ErrorToast("Could not load invoices");
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <>
            <AdminHeaderComponent/>
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
                        <th>Delivery Charge</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map((inv) => (
                        <tr key={inv._id}>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() =>
                                        navigate(`/admin/invoicelist/invoiceproductlist/${inv._id}`)
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
                            <td>{inv.location}</td>
                            <td>{inv.total}</td>
                            <td>{inv.deliveryCharge}</td>
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
                            <td>
                                {inv.createdAt
                                    ? new Date(inv.createdAt).toLocaleString()
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default ViewInvoices;
