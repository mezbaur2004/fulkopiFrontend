import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { productListByBrand } from "../APIRequest/productAPIRequest.js";

const ProductsByBrand = () => {
    const navigate = useNavigate();
    const { brandID } = useParams();

    useEffect(() => {
        (async () => {
            await productListByBrand(brandID);
        })();
    }, [brandID]);

    const ProductList = useSelector((state) => state.products.ListByBrand);

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
                {ProductList && ProductList.length > 0 ? (
                    ProductList.map((product) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={product._id}
                        >
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.image || "/placeholder.png"}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/productdetails/${product._id}`)}
                                />
                                <div className="card-body d-flex flex-column bg-light">
                                    {product.discount ? (
                                        <>
                                            <h4 className="card-title fw-bold text-muted">
                                                {product.title}
                                            </h4>
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
                                            <p className="card-text mb-2 fw-semibold">
                                                Price: {product.price || "N/A"}tk
                                            </p>
                                        </>
                                    )}

                                    <div className="mt-auto d-flex flex-column flex-sm-row gap-2">
                                        <button className="btn btn-secondary flex-fill">
                                            Add to Cart
                                        </button>
                                        <button className="btn btn-secondary flex-fill">
                                            Add To Wishlist
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-outline-warning text-dark mt-2 fw-bold"
                                        onClick={() => navigate(`/productdetails/${product._id}`)}
                                    >
                                        Product Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-danger mt-5 pt-5">No products Found😓</h1>
                )}
            </div>
        </div>
    );
};

export default ProductsByBrand;
