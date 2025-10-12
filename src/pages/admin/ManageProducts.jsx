import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProduct } from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const ManageProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await readProduct();
            setProducts(data || []);
        })();
    }, []);

    const hasDiscountColumn = products.some(
        (p) => p?.discount === true || (!!p?.discountPrice && p.discountPrice > 0)
    );

    return (
        <AdminMasterLayout>
            <div className="container-fluid">
                <h2 className="mb-4 text-success">Manage Products</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle text-nowrap">
                        <thead className="table-dark">
                        <tr>
                            <th>Actions</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            {hasDiscountColumn && <th>Discount Price</th>}
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
                        {products.map((p) => {
                            const discountPrice = p.discountPrice ?? null;
                            const hasDiscount = p.discount || (discountPrice > 0);
                            return (
                                <tr key={p._id}>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => navigate(`/admin/products/update/${p._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="img-thumbnail"
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </td>
                                    <td>{p.title}</td>
                                    <td>{p.des}</td>
                                    <td>
                                        {hasDiscount && discountPrice ? (
                                            <span className="text-decoration-line-through me-2">{p.price}</span>
                                        ) : (
                                            p.price
                                        )}
                                    </td>
                                    {hasDiscountColumn && <td>{hasDiscount ? discountPrice : "—"}</td>}
                                    <td>
                                            <span className={`badge ${hasDiscount ? "bg-warning text-dark" : "bg-light text-dark"}`}>
                                                {hasDiscount ? "Yes" : "No"}
                                            </span>
                                    </td>
                                    <td>
                                            <span className={`badge ${p.stock ? "bg-success" : "bg-danger"}`}>
                                                {p.stock ? "In Stock" : "Out of Stock"}
                                            </span>
                                    </td>
                                    <td>
                                            <span className={`badge ${p.status ? "bg-light text-dark" : "bg-secondary"}`}>
                                                {p.status ? "Active" : "Inactive"}
                                            </span>
                                    </td>
                                    <td>{p.remarks || "—"}</td>
                                    <td>{p.brand?.brandName || "—"}</td>
                                    <td>{p.category?.categoryName || "—"}</td>
                                    <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</td>
                                    <td>{p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "—"}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminMasterLayout>
    );
};

export default ManageProducts;
