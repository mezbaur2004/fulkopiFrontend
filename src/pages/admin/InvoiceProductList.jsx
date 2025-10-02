// src/pages/admin/InvoiceProductList.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { invoiceDetails } from "../../APIRequest/AdminAPIRequest.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const InvoiceProductList = () => {
    const { id } = useParams(); // invoice id from URL
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await invoiceDetails(id);
            if (data) setProducts(data);
        })();
    }, [id]);

    return (
        <>
            <AdminHeaderComponent/>

        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Invoice Products</h2>
                <Link to="/admin/invoicelist" className="btn btn-secondary">
                    ← Back to Invoices
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-info">No products found for this invoice.</div>
            ) : (
                <div className="row">
                    {products.map((item) => (
                        <div className="col-md-4 mb-4" key={item._id}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={item.product?.image}
                                    className="card-img-top"
                                    alt={item.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text text-muted">{item.product?.des}</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            Qty: <strong>{item.qty}</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Price: <strong>৳{item.price}</strong>
                                        </li>
                                        <li className="list-group-item">
                                            Subtotal:{" "}
                                            <strong className="text-success">৳{item.subtotal}</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default InvoiceProductList;
