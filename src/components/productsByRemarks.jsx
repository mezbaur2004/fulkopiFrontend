import React, {useEffect} from 'react';
import {productListByRemarks} from "../APIRequest/productAPIRequest.js";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";


const ProductsByRemarks = () => {
    const navigate = useNavigate();
    let {remarks} = useParams();
    useEffect(() => {
        (async () => {
            await productListByRemarks(remarks);
        })()
    }, [remarks]);

    let ProductList = useSelector((state) => (state.products.ListByRemark))
    return (
        <>
            <div className="container mt-4 mb-2">
                <div className="row g-3">
                    <div className="text-muted"><h4>Showing "{remarks}"</h4></div>
                    {ProductList && ProductList.length > 0 ? (
                        ProductList.map((product, index) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={product.image || "/placeholder.png"}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{cursor: "pointer"}}
                                        onClick={() => navigate(`/productdetails/${product._id}`)}
                                    />
                                    <div className="card-body d-flex flex-column bg-light">
                                        {product.discount ? (
                                            <>
                                                <h4 className="card-title fw-bold text-muted">{product.title}</h4>
                                                <p className="card-text mb-2 fw-semibold">
                                                    Offer Price: {product.discountPrice || "N/A"}tk
                                                </p>
                                                <p className="card-text text-muted mb-2 text-decoration-line-through">
                                                    Price: {product.price || "N/A"}tk
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="card-title fw-bold text-muted">{product.title}</h4>
                                                <p className="card-text mb-2 fw-semibold">
                                                    Price: {product.price || "N/A"}tk
                                                </p>
                                            </>
                                        )}

                                        <div className="mt-auto d-flex flex-column flex-sm-row gap-2">
                                            <button className="btn btn-secondary flex-fill">Add to Cart</button>
                                            <button className="btn btn-secondary flex-fill">Add To Wishlist</button>
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
        </>
    );
};

export default ProductsByRemarks;