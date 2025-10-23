import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { productListByCategory } from "../APIRequest/productAPIRequest.js";
import { getToken } from "../helper/sessionHelper.js";
import { addToCart } from "../APIRequest/cartAPIRequest.js";
import { addToWish } from "../APIRequest/wishAPIRequest.js";
import { ErrorToast } from "../helper/formHelper.js";

const ProductsByCategory = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const ProductList = useSelector((state) => state.products.ListByCategory || []);

    const fetchProducts = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const paginationData = await productListByCategory(slug, pageNumber, 4);
            if (paginationData?.totalPages) {
                setTotalPages(paginationData.totalPages);
                setPage(paginationData.page);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const currentPage = Number(searchParams.get("page")) || 1;
        if (currentPage !== page) {
            setPage(currentPage);
            return;
        }
        fetchProducts(currentPage);
    }, [slug, page, searchParams]);

    document.title = `Category | ${
        ProductList.length > 0 ? ProductList[0].category?.categoryName || "Category" : "By Category"
    }`;

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
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn ${i === page ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => {
                        setPage(i);
                        setSearchParams(i === 1 ? {} : { page: i }); // page 1 has no URL
                    }}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
                <button
                    className="btn btn-outline-success"
                    disabled={page === 1}
                    onClick={() => {
                        const prev = Math.max(1, page - 1);
                        setPage(prev);
                        setSearchParams(prev === 1 ? {} : { page: prev });
                    }}
                >
                    « Prev
                </button>
                {pages}
                <button
                    className="btn btn-outline-success"
                    disabled={page === totalPages}
                    onClick={() => {
                        const next = Math.min(totalPages, page + 1);
                        setPage(next);
                        setSearchParams(next === 1 ? {} : { page: next });
                    }}
                >
                    Next »
                </button>
            </div>
        );
    };

    return (
        <div className="container mt-4 mb-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item text-muted">
                        {ProductList.length > 0
                            ? ProductList[0].category?.categoryName || "Category"
                            : "Category"}
                    </li>
                </ol>
            </nav>

            <div className="row g-4">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : ProductList.length > 0 ? (
                    ProductList.map((product, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                            <div
                                className="card h-100 shadow-sm border-0 position-relative"
                                style={{
                                    borderRadius: "15px",
                                    background: "linear-gradient(180deg, #fff, #f9f9f9)",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {product.discount && (
                                    <span
                                        className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded text-white fw-semibold"
                                        style={{ background: "#ff6b6b", fontSize: "0.85rem" }}
                                    >
                                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                    </span>
                                )}
                                <img
                                    src={product.image || "/placeholder.png"}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{
                                        cursor: "pointer",
                                        borderTopLeftRadius: "15px",
                                        borderTopRightRadius: "15px",
                                        height: "200px",
                                        objectFit: "contain",
                                        padding: "10px",
                                        backgroundColor: "#f5f5f5",
                                    }}
                                    onClick={() => navigate(`/productdetails/${product.slug}`)}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="fw-bold text-dark text-truncate">{product.title}</h5>
                                    <span className={`badge w-fit mb-2 ${product.stock ? "bg-success" : "bg-danger"}`}>
                                        {product.stock ? "In Stock" : "Out of Stock"}
                                    </span>

                                    {product.discount ? (
                                        <p className="fw-semibold mb-1 text-success">
                                            ৳{product.discountPrice}
                                            <span className="text-muted ms-2 text-decoration-line-through">
                                                ৳{product.price}
                                            </span>
                                        </p>
                                    ) : (
                                        <p className="fw-semibold text-success mb-1">৳{product.price}</p>
                                    )}

                                    <div className="mt-auto d-flex justify-content-between gap-2">
                                        <button
                                            className="btn btn-sm btn-warning flex-grow-1 fw-semibold"
                                            onClick={() => handleAddToCart(product._id, 1)}
                                            disabled={!product.stock}
                                        >
                                            <i className="bi bi-cart me-1"></i> Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-dark flex-grow-1 fw-semibold"
                                            onClick={() => handleAddToWish(product._id)}
                                        >
                                            <i className="bi bi-heart me-1"></i> Wishlist
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-sm btn-outline-secondary mt-3 fw-semibold"
                                        onClick={() => navigate(`/productdetails/${product.slug}`)}
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No Products Found</p>
                )}
            </div>

            {totalPages > 1 && renderPagination()}
        </div>
    );
};

export default ProductsByCategory;
