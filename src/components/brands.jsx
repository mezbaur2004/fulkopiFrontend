import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {brandList} from "../APIRequest/productAPIRequest";
import {Link, useNavigate} from "react-router-dom";

const Brands = () => {
    const navigate = useNavigate();

    useEffect(() => {
        brandList();
    }, []);

    document.title = `Brands | FULKOPI`;

    const brands = useSelector((state) => state.products.BrandList || []);

    return (
        <div className="container mt-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item text-muted">Brands</li>
                </ol>
            </nav>
            <h2 className="mb-4">Our Brands</h2>

            {brands && brands.length > 0 ? (
                <div className="row g-3">
                    {brands.map((brand) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={brand.slug}>
                            <div
                                className="card h-100 text-center shadow-sm"
                                style={{cursor: "pointer"}}
                                onClick={() =>
                                    navigate(`/brand/${brand.slug}`)
                                }
                            >
                                <img
                                    src={brand.brandImg || "/placeholder.png"}
                                    className="card-img-top p-2"
                                    alt={brand.brandName}
                                    style={{height: "100px", objectFit: "contain"}}
                                />
                                <div className="card-body p-2">
                                    <h6 className="card-title mb-0">{brand.brandName}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className="text-muted text-center mt-5">No Brand Found 😓</h4>
            )}
        </div>
    );
};

export default Brands;
