import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {categoryList} from "../APIRequest/productAPIRequest";
import {Link, useNavigate} from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();

    useEffect(() => {
        categoryList();
    }, []);

    document.title = `Categories | FULKOPI`;

    const categories = useSelector((state) => state.products.CategoryList || []);

    return (
        <div className="container mt-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent px-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item text-muted">Categories</li>
                </ol>
            </nav>
            <h2 className="mb-4">All Categories</h2>

            {categories && categories.length > 0 ? (
                <div className="row g-3">
                    {categories.map((category) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={category._id}>
                            <div
                                className="card h-100 text-center shadow-sm"
                                style={{cursor: "pointer"}}
                                onClick={() =>
                                    navigate(`/category/${category._id}`)
                                }
                            >
                                <img
                                    src={category.categoryImg || "/placeholder.png"}
                                    className="card-img-top p-2"
                                    alt={category.categoryName}
                                    style={{height: "100px", objectFit: "contain"}}
                                />
                                <div className="card-body p-2">
                                    <h6 className="card-title mb-0">{category.categoryName}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className="text-muted text-center mt-5">No Category Found 😓</h4>
            )}
        </div>
    );
};

export default Categories;
