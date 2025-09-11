import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { productDetail } from "../APIRequest/productAPIRequest.js";
import { useSelector } from "react-redux";
import {addToCart} from "../APIRequest/cartAPIRequest.js";
import {addToWish} from "../APIRequest/wishAPIRequest.js";
import {getToken} from "../helper/sessionHelper.js";
import {ErrorToast} from "../helper/formHelper.js";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();

    const product = useSelector((state) => state.products.ProductDetails);

    useEffect(() => {
        (async () => {
            await productDetail(id);
        })();
    }, [id]);

    // temporary placeholder functions
    const handleAddToCart =async (productId, qty) => {
        if(getToken()){
            await addToCart(productId, qty);
        }else{
            ErrorToast("Please Log In First");
            navigate("/login");
        }
    };

    const handleAddToWish=async (productId) => {
        if(getToken()){
            await addToWish(productId)
        }else{
            ErrorToast("Please Log In First");
            navigate("/login");
        }
    }

    // guard for undefined product
    if (!product) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none text-muted">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href={`/category/${product.categoryID}`} className="text-decoration-none text-muted">
                            {product.category?.categoryName || "Category"}
                        </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {product.title}
                    </li>
                </ol>
            </nav>

            <div className="row g-4">
                {/* Left: Product Image + Brand/Category */}
                <div className="col-12 col-md-6">
                    <div className="card card-lg p-3 shadow-sm">
                        <img
                            src={product.image || "/placeholder.png"}
                            alt={product.title}
                            className="w-100 rounded"
                            style={{ objectFit: "cover", height: 420 }}
                        />
                        <div className="mt-3 d-flex gap-2 align-items-center">
                            {product.category?.categoryImg && (
                                <img
                                    src={product.category.categoryImg}
                                    alt={product.category.categoryName}
                                    className="rounded"
                                    style={{ width: 48, height: 48, objectFit: "cover" }}
                                />
                            )}
                            <div>
                                <div className="small text-muted">Category</div>
                                <a
                                    href={`/category/${product.categoryID}`}
                                    className="text-decoration-none text-dark fw-semibold"
                                >
                                    {product.category?.categoryName || "N/A"}
                                </a>
                            </div>

                            <div className="ms-auto text-end">
                                <div className="d-flex align-items-center justify-content-end">
                                    {product.brand?.brandImg && (
                                        <img
                                            src={product.brand.brandImg}
                                            alt={product.brand.brandName}
                                            className="rounded-circle"
                                            style={{ width: 48, height: 48, objectFit: "cover", marginRight: 8 }}
                                        />
                                    )}
                                    <a
                                        href={`/brand/${product.brandID}`}
                                        className="text-decoration-none text-dark fw-semibold"
                                    >
                                        {product.brand?.brandName || "N/A"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="col-12 col-md-6 d-flex flex-column">
                    <div className="card card-lg p-4 mb-3 shadow-sm d-flex flex-column h-100">
                        <h2 className="mb-1">{product.title}</h2>

                        {/* Price and stock */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                            {product.discount ? (
                                <div>
                  <span className="text-muted text-decoration-line-through me-2">
                    {product.price} tk
                  </span>
                                    <span className="fw-bold text-danger">{product.discountPrice} tk</span>
                                </div>
                            ) : (
                                <p className="fw-bold mb-0">{product.price} tk</p>
                            )}

                            <span className={`badge ${product.stock ? "bg-success" : "bg-danger"}`}>
                {product.stock ? "In Stock" : "Out of Stock"}
              </span>
                        </div>

                        {/* Remarks */}
                        {product.remarks && (
                            <Link
                                to={`/productbyremarks/${product.remarks}`}
                                className="btn btn-secondary mb-3"
                            >
                                {product.remarks}
                            </Link>
                        )}


                        {/* Quantity + CTA buttons */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="flex items-center gap-2 border rounded-md w-28 justify-between">
                                <button
                                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-l-md"
                                    type="button"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>
                                <span className="w-full p-3 text-center">{quantity}</span>
                                <button
                                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-r-md"
                                    type="button"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    +
                                </button>
                            </div>


                            <button
                                className="btn btn-warning fw-bold"
                                onClick={() => handleAddToCart(product._id, quantity)}
                                disabled={!product.stock}
                            >
                                Add to Cart <i className="bi bi-cart" />
                            </button>
                            <button
                                className="btn btn-dark"
                                onClick={() => handleAddToWish(product._id)}
                            >
                                Add To Wishlist <i className="bi bi-heart" />
                            </button>
                        </div>

                        {/* Meta */}
                        <dl className="row mt-2 mb-0">
                            <dt className="col-sm-4">Brand</dt>
                            <dd className="col-sm-8">
                                <a href={`/brand/${product.brandID}`} className="text-decoration-none text-muted fw-semibold">
                                    {product.brand?.brandName || "N/A"}
                                </a>
                            </dd>

                            <dt className="col-sm-4">Category</dt>
                            <dd className="col-sm-8">
                                <a href={`/category/${product.categoryID}`} className="text-decoration-none text-muted fw-semibold">
                                    {product.category?.categoryName || "N/A"}
                                </a>
                            </dd>

                            <dt className="col-sm-4">Added</dt>
                            <dd className="col-sm-8 fw-semibold">{new Date(product.createdAt).toLocaleDateString()}</dd>
                        </dl>
                    </div>

                    <div className="card card-lg p-4 shadow-sm">
                        <h5 className="mb-3">Product Details</h5>
                        <p className="text-muted">{product.des}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
