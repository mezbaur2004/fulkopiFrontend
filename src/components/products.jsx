import React, {useEffect} from 'react';
import {productList} from "../APIRequest/productAPIRequest.js";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getToken} from "../helper/sessionHelper.js";
import {addToCart} from "../APIRequest/cartAPIRequest.js";
import {ErrorToast} from "../helper/formHelper.js";
import {addToWish} from "../APIRequest/wishAPIRequest.js";

const Products = () => {

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
                await productList();
        })()
    }, []);

    let ProductList=useSelector((state)=>(state.products.List))

    const handleAddToCart = async (productId,qty) => {
        if(getToken()){
            await addToCart(productId, qty);
        }else{
            ErrorToast("Please Log In First");
            navigate("/login");
        }
    }

    const handleAddToWish=async (productId) => {
        if(getToken()){
            await addToWish(productId);
        }else{
            ErrorToast("Please Log In First");
            navigate("/login");
        }
    }
    return (
        <>
        <div className="container mt-4 mb-2">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item text-muted">Products</li>
                </ol>
            </nav>
            <div className="row g-3">
                {ProductList.map((product, index) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.image || "/placeholder.png"}
                                className="card-img-top"
                                alt={product.name}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/productdetails/${product._id}`)}
                            />
                            <div className="card-body d-flex flex-column bg-light">
                                {product.discount?(
                                    <>
                                        <h4 className="card-title fw-bold text-muted">{product.title}</h4>
                                        <span className={`badge ${product.stock ? "bg-success" : "bg-danger"}`}>
                {product.stock ? "In Stock" : "Out of Stock"}
              </span>
                                        <p className="card-text mb-2 fw-semibold">Offer Price: {product.discountPrice || "N/A"}tk</p>
                                        <p className="card-text text-muted mb-2 text-decoration-line-through ">Price: {product.price || "N/A"}tk</p>
                                    </>
                                ):(
                                    <>
                                        <h4 className="card-title fw-bold text-muted">{product.title}</h4>
                                        <span className={`badge ${product.stock ? "bg-success" : "bg-danger"}`}>
                {product.stock ? "In Stock" : "Out of Stock"}
              </span>
                                        <p className="card-text mb-2 fw-semibold ">Price: {product.price || "N/A"}tk</p>
                                    </>
                                )}
                                <div className="mt-auto d-flex flex-column flex-sm-row gap-2">
                                    <button
                                        className="btn btn-warning fw-semibold"
                                        onClick={() => handleAddToCart(product._id, 1)}
                                        disabled={!product.stock}
                                    >
                                        Add to Cart <i className="bi bi-cart" />
                                    </button>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => handleAddToWish(product._id)}
                                    >
                                        Add Wishlist <i className="bi bi-heart" />
                                    </button>
                                </div>
                                <button className="btn btn-outline-warning text-dark mt-2 fw-bold"
                                        onClick={() => navigate(`/productdetails/${product._id}`)}
                                >Product Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Products;