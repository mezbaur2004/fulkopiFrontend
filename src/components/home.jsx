// Home.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productList } from "../APIRequest/productAPIRequest.js";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,A11y, Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await productList();
        })();
    }, []);

    const ProductList = useSelector((state) => state.products.List || []);

    // render nothing until products are loaded to avoid init issues
    if (!ProductList.length) {
        return (
            <div className="container mt-4 text-center">
                <div className="p-4 bg-dark text-light rounded shadow-sm">Loading products…</div>
            </div>
        );
    }

    return (
        <>
        <div className="container mt-4">
            <div className="p-4 text-center bg-dark rounded shadow-sm mb-4">
                <h1 className="fw-semibold">www.fulkopi.com</h1>
                <p className="fw-semibold">Best deals, fast delivery, secure payment</p>
                <button className="btn btn-warning fw-bold" onClick={() => navigate("/products")}>
                    Shop Now
                </button>
            </div>

            <h3 className="mb-3 text-dark text-muted fw-semibold">Grocery Delivered at your Doorstep</h3>

            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                }}
                loop={true}
                grabCursor={true}
                autoplay={{
                    delay: 2500,       // 2.5 seconds between slides
                    disableOnInteraction: false, // keeps autoplay after user swipes
                }}
                allowTouchMove={true}
                simulateTouch={true}
                style={{ paddingBottom: 20 }}
            >

                {ProductList.map((product, index) => (
                    <SwiperSlide key={product._id || index}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.image || "/placeholder.png"}
                                className="card-img-top"
                                alt={product.title}
                                style={{
                                    cursor: "pointer",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: 320
                                }}
                                onClick={() => navigate(`/productdetails/${product._id}`)}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">Price: {product.price} tk</p>
                                <button onClick={() => navigate(`/productdetails/${product._id}`)} className="btn btn-secondary">View Product</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="text-center my-4">
                <button
                    className="btn btn-warning fw-bold text-muted px-4 py-2"
                    onClick={() => navigate("/products")}
                >
                    View All Products
                </button>
            </div>

        </div>

            <div className="container my-5">
                <h3 className="mb-4 text-center text-muted fw-bold">How It Works?</h3>

                <div className="d-flex flex-column align-items-center gap-4">
                    {/* Step 1 */}
                    <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "70%" }}>
                        <div className="card-body text-center bg-dark text-light rounded-3 p-4">
                            <i className="bi bi-search text-warning display-4 d-none d-md-inline"></i>
                            <i className="bi bi-search text-warning fs-1 d-md-none"></i>

                            <h4 className="mt-3 fw-bold">1. Browse Products</h4>
                            <p className="text-light small">
                                Explore thousands of items across categories and find what you need.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "70%" }}>
                        <div className="card-body text-center bg-dark text-light rounded-3 p-4">
                            <i className="bi bi-cart-check text-warning display-4 d-none d-md-inline"></i>
                            <i className="bi bi-cart-check text-warning fs-1 d-md-none"></i>

                            <h4 className="mt-3 fw-bold">2. Place Order</h4>
                            <p className="text-light small">
                                Add items to your cart and checkout securely in just a few clicks.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "70%" }}>
                        <div className="card-body text-center bg-dark text-light rounded-3 p-4">
                            <i className="bi bi-box-seam text-warning display-4 d-none d-md-inline"></i>
                            <i className="bi bi-box-seam text-warning fs-1 d-md-none"></i>

                            <h4 className="mt-3 fw-bold">3. Fast Delivery</h4>
                            <p className="text-light small">
                                Sit back and relax while we deliver straight to your doorstep.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container my-5">
                <div className="card shadow-lg border-0 w-100">
                    <div className="card-body text-center bg-warning text-dark rounded-3 p-5">
                        <h3 className="fw-bold mb-3">Exclusive Deals & Offers</h3>
                        <p className="fs-5 mb-4">
                            Get the best prices on your favorite products. Limited time only!
                        </p>
                        <p className="text-dark small">
                            Don’t miss out on our hot deals — fresh offers added every week.
                        </p>
                        <button
                            className="btn btn-dark fw-bold px-4 py-2 mt-3"
                            onClick={() => navigate("/products")}
                        >
                            Grab Deals
                        </button>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <div className="card shadow-lg border-0 w-100">
                    <div className="card-body text-center bg-dark text-light rounded-3 p-5">
                        <h3 className="fw-bold mb-3">We Deliver To</h3>
                        <p className="fs-5 mb-4">
                            Dhaka · Chittagong · Rangpur · Rajshahi · Khulna · Sylhet
                        </p>
                        <p className="text-light small">
                            Fast and reliable delivery to major cities in Bangladesh.
                        </p>
                        <button
                            className="btn btn-warning fw-bold px-4 py-2 mt-3"
                            onClick={() => navigate("/products")}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>



            <div className="container my-5">
                <h3 className="mb-4 text-center text-dark text-muted fw-bold">Why Shop With Us?</h3>

                <div className="row g-4 text-center">
                    {/* Secure Payment */}
                    <div className="col-6 col-md-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <i className="bi bi-shield-lock fs-1 text-warning"></i>
                                <h6 className="mt-3 fw-semibold">Secure Payment</h6>
                                <p className="text-muted small">SSLCommerz safe checkout</p>
                            </div>
                        </div>
                    </div>

                    {/* Fast Delivery */}
                    <div className="col-6 col-md-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <i className="bi bi-truck fs-1 text-warning"></i>
                                <h6 className="mt-3 fw-semibold">Fast Delivery</h6>
                                <p className="text-muted small">Get products within 2-3 days</p>
                            </div>
                        </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div className="col-6 col-md-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <i className="bi bi-cash-coin fs-1 text-warning"></i>
                                <h6 className="mt-3 fw-semibold">Cash on Delivery</h6>
                                <p className="text-muted small">Pay after receiving your order</p>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="col-6 col-md-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <i className="bi bi-headset fs-1 text-warning"></i>
                                <h6 className="mt-3 fw-semibold">24/7 Support</h6>
                                <p className="text-muted small">Always here to help you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;
