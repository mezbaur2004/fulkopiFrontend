import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {invoiceList} from "../APIRequest/invoiceAPIRequest.js";

const Invoice = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await invoiceList();
        })();
    }, []);

    document.title = `Orders | FULKOPI`;

    const invoices = useSelector((state) => state.invoices.List || []);

    // group by status
    const successInvoices = invoices.filter((inv) => inv.paymentStatus === "success");
    const pendingInvoices = invoices.filter((inv) => inv.paymentStatus === "pending");
    const failInvoices = invoices.filter((inv) => inv.paymentStatus === "fail");
    const cancelInvoices = invoices.filter((inv) => inv.paymentStatus === "cancel");

    const renderTable = (data, status) => (
        <div className="card shadow-sm p-3 mb-4">
            <h5 className="fw-bold text-capitalize mb-3">{status} Orders</h5>
            {data.length === 0 ? (
                <p className="text-muted">No {status} invoices found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Tran ID</th>
                            <th>Customer</th>
                            <th>Location</th>
                            <th>Total (৳)</th>
                            <th>Delivery</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((inv) => (
                            <tr key={inv._id}>
                                <td>{inv.tran_id}</td>
                                <td>{inv.customerName}</td>
                                <td>{inv.location}</td>
                                <td>{inv.total}</td>
                                <td>{inv.deliveryCharge}</td>
                                <td>{new Date(inv.createdAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => navigate(`/invoiceproduct/${inv._id}`)}
                                    >
                                        View Details 🔍
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    return (
        <div className="container my-4">
            {renderTable(successInvoices, "success")}
            {renderTable(pendingInvoices, "pending")}
            {renderTable(failInvoices, "fail")}
            {renderTable(cancelInvoices, "cancel")}
        </div>
    );
};

export default Invoice;
