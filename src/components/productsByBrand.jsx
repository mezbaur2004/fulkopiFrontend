import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {productListByBrand} from "../APIRequest/productAPIRequest.js";
import {addToCart} from "../APIRequest/cartAPIRequest.js";
import {addToWish} from "../APIRequest/wishAPIRequest.js";
import {ErrorToast} from "../helper/formHelper.js";
import {getToken} from "../helper/sessionHelper.js";

const ProductsByBrand = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const ProductList = useSelector((state) => state.products.ListByBrand);

    const fetchProducts = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const paginationData = await productListByBrand(slug, pageNumber, 4);
            if (paginationData?.totalPages) {
                setTotalPages(paginationData.totalPages);
                setPage(paginationData.page);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [slug, page]);

    document.title = `Brand | ${
        ProductList && ProductList.length > 0
            ? ProductList[0].brand?.brandName || "Brand"
            : "by brand"}`;

    const handleAddToCart = async (productId, qty) => {
        if (getToken()) {
            await addToCart(productId, qty);
        } else {
            ErrorToast("Please Log In First");
            navigate("/login");
        }
    };

    const handleAddToWish = async (productId) => {
        if (getToken()) {
            await addToWish(productId);
        } else {
            ErrorToast("Please Log In First");
            navigate("/login");
        }
    };

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

    return (
        <div className="container mt-4 mb-2">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item text-muted">
                        {ProductList && ProductList.length > 0
                            ? ProductList[0].brand?.brandName || "Brand"
                            : "Brand"}
                    </li>
                </ol>
            </nav>

            {/* Products Grid */}
            <div className="row g-3">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : ProductList.length > 0 ? (
                    ProductList.map((product, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.image || "/placeholder.png"}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{cursor: "pointer"}}
                                    onClick={() => navigate(`/productdetails/${product.slug}`)}
                                />
                                <div className="card-body d-flex flex-column bg-light">
                                    {product.discount ? (
                                        <>
                                            <h4 className="card-title fw-bold text-muted">
                                                {product.title}
                                            </h4>
                                            <span
                                                className={`badge ${
                                                    product.stock ? "bg-success" : "bg-danger"
                                                }`}
                                            >
                                                {product.stock ? "In Stock" : "Out of Stock"}
                                            </span>
                                            <p className="card-text mb-2 fw-semibold">
                                                Offer Price: {product.discountPrice || "N/A"}tk
                                            </p>
                                            <p className="card-text text-muted mb-2 text-decoration-line-through">
                                                Price: {product.price || "N/A"}tk
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="card-title fw-bold text-muted">
                                                {product.title}
                                            </h4>
                                            <span
                                                className={`badge ${
                                                    product.stock ? "bg-success" : "bg-danger"
                                                }`}
                                            >
                                                {product.stock ? "In Stock" : "Out of Stock"}
                                            </span>
                                            <p className="card-text mb-2 fw-semibold">
                                                Price: {product.price || "N/A"}tk
                                            </p>
                                        </>
                                    )}
                                    <div className="mt-auto d-flex flex-column flex-sm-row gap-2">
                                        <button
                                            className="btn btn-warning fw-semibold"
                                            onClick={() => handleAddToCart(product._id, 1)}
                                            disabled={!product.stock}
                                        >
                                            Add to Cart <i className="bi bi-cart"/>
                                        </button>
                                        <button
                                            className="btn btn-dark"
                                            onClick={() => handleAddToWish(product._id)}
                                        >
                                            Add Wishlist <i className="bi bi-heart"/>
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-outline-warning text-dark mt-2 fw-bold"
                                        onClick={() => navigate(`/productdetails/${product.slug}`)}
                                    >
                                        Product Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No Products Found</p>
                )}
            </div>

            {/* Numbered Pagination */}
            {totalPages > 1 && renderPagination()}
        </div>
    );
};

export default ProductsByBrand;
