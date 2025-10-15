import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {invoiceProductList} from "../APIRequest/invoiceAPIRequest.js";

const InvoiceProduct = () => {
    const {invoiceID} = useParams();

    useEffect(() => {
        (async () => {
            await invoiceProductList(invoiceID);
        })();
    }, [invoiceID]);

    document.title = `invoice-products | FULKOPI`;

    const invoiceProducts = useSelector(
        (state) => state.invoices.ProductList || []
    );

    return (
        <div className="container my-4">
            <h3 className="mb-3 fw-bold">Invoice Products</h3>

            {invoiceProducts.length === 0 ? (
                <p className="text-muted">No products found for this invoice.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Price (৳)</th>
                            <th>Subtotal (৳)</th>
                            <th>Remarks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoiceProducts.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <img
                                        src={item.product?.image}
                                        alt={item.title}
                                        style={{width: "60px", height: "60px", objectFit: "cover"}}
                                    />
                                </td>
                                <td>{item.product?.title || item.title}</td>
                                <td className="text-truncate" style={{maxWidth: "250px"}}>
                                    {item.product?.des}
                                </td>
                                <td>{item.qty}</td>
                                <td>{item.price}</td>
                                <td>{item.subtotal}</td>
                                <td>{item.product?.remarks}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="5" className="text-end fw-bold">
                                Subtotal
                            </td>
                            <td colSpan="2" className="fw-bold">
                                {invoiceProducts.reduce((sum, p) => sum + p.subtotal, 0)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5" className="text-end fw-bold">
                                Delivery Charge
                            </td>
                            <td colSpan="2" className="fw-bold">110</td>
                        </tr>
                        <tr>
                            <td colSpan="5" className="text-end fw-bold">
                                Grand Total
                            </td>
                            <td colSpan="2" className="fw-bold">
                                {invoiceProducts.reduce((sum, p) => sum + p.subtotal, 0) + 110}
                            </td>
                        </tr>
                        </tfoot>

                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceProduct;
