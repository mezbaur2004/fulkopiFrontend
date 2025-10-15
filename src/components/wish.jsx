import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getWishList, removeFromWish} from "../APIRequest/wishAPIRequest.js";
import {addToCart} from "../APIRequest/cartAPIRequest.js";

const Wish = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await getWishList();
        })();
    }, []);

    document.title = `Wish | FULKOPI`;

    const ProductList = useSelector((state) => state.wishes.List || []);

    const handleAddToCart = async (_id, qty) => {
        await addToCart(_id, qty);
    };

    const handleRemoveFromWish = async (_id) => {
        await removeFromWish(_id);
    }

    return (
        <div className="container mt-4 mb-2">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item text-muted">Wish</li>
                </ol>
            </nav>

            {ProductList.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">Your wish list is empty 😓</h4>
                    <p className="text-muted">Browse products and add items to your wish list.</p>
                    <Link to="/products" className="btn btn-outline-warning">
                        Browse products
                    </Link>
                </div>
            ) : (
                <div className="list-group">
                    {ProductList.map((item) => {
                        const pricePerItem = item.product.discount
                            ? item.product.discountPrice
                            : item.product.price;
                        const totalPrice = (pricePerItem || 0) * (item.qty || 0);

                        return (
                            <div
                                key={item._id}
                                className="list-group-item mb-3 p-3 shadow-sm rounded"
                            >
                                {/* Use responsive row/cols so it stacks on mobile */}
                                <div className="row g-3 align-items-center">
                                    {/* Image column: small on mobile, fixed-ish on md+ */}
                                    <div className="col-12 col-sm-4 col-md-2">
                                        <div
                                            role="button"
                                            onClick={() => navigate(`/productdetails/${item.product.slug}`)}
                                            className="w-100"
                                        >
                                            <img
                                                src={item.product.image || "/placeholder.png"}
                                                alt={item.product.title}
                                                className="img-fluid rounded"
                                                style={{
                                                    width: "100%",
                                                    maxHeight: 110,
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Details column */}
                                    <div className="col-12 col-sm-8 col-md-8">
                                        <h5
                                            className="mb-1 text-muted"
                                            style={{cursor: "pointer"}}
                                            onClick={() => navigate(`/productdetails/${item.product.slug}`)}
                                        >
                                            {item.product.title}
                                        </h5>
                                        <span className={`badge ${item.product.stock ? "bg-success" : "bg-danger"}`}>
                {item.product.stock ? "In Stock" : "Out of Stock"}
              </span>
                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            <small className="text-muted">
                                                <strong>Brand:</strong> {item.brand?.brandName || "—"}
                                            </small>
                                            <small className="text-muted">
                                                <strong>Category:</strong> {item.category?.categoryName || "—"}
                                            </small>
                                            {item.product.remarks && (
                                                <small className="badge bg-warning text-dark">
                                                    {item.product.remarks}
                                                </small>
                                            )}
                                        </div>

                                        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                                            <div>
                                                <small className="text-muted">Price / item</small>
                                                <div className="fw-semibold">
                                                    {pricePerItem || "N/A"} tk
                                                    {item.product.discount && (
                                                        <small
                                                            className="text-decoration-line-through text-danger ms-2">
                                                            {item.product.price} tk
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions column: on mobile buttons stack full-width, on md+ align to end */}
                                    <div
                                        className="col-12 col-md-2 d-flex flex-column align-items-stretch align-items-md-end gap-2">
                                        <button
                                            className="btn btn-dark w-100"
                                            onClick={() => handleAddToCart(item.productID, 1)}
                                            disabled={!item.product.stock}
                                        >
                                            <i className="bi bi-cart me-1"/> Add To Cart
                                        </button>

                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() => handleRemoveFromWish(item._id)}
                                        >
                                            <i className="bi bi-trash me-1"/> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="mt-3">
                <button
                    className="btn btn-success w-100 fw-bold py-2"
                    onClick={() => navigate("/cart")}
                >
                    View Cart
                </button>
            </div>
        </div>
    );
};

export default Wish;
