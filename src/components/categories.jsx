import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categoryList } from "../APIRequest/productAPIRequest";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const categories = useSelector((state) => state.products.CategoryList || []);

    const fetchCategories = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const paginationData = await categoryList(pageNumber, 6);
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
        fetchCategories(currentPage);
    }, [page, searchParams]); // ✅ added searchParams to dependency

    document.title = `Categories | FULKOPI`;

    const renderPagination = () => {
        if (totalPages <= 1) return null;

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
                    className={`btn btn-sm me-2 ${i === page ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => {
                        setPage(i);
                        setSearchParams({ page: i }); // ✅ update URL
                    }}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => {
                        const prev = Math.max(1, page - 1);
                        setPage(prev);
                        setSearchParams({ page: prev }); // ✅ update URL
                    }}
                    disabled={page === 1}
                >
                    Prev
                </button>
                {pages}
                <button
                    className="btn btn-sm btn-outline-success ms-2"
                    onClick={() => {
                        const next = Math.min(totalPages, page + 1);
                        setPage(next);
                        setSearchParams({ page: next }); // ✅ update URL
                    }}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        );
    };

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

            <h2 className="mb-4">Our Categories</h2>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-success" role="status"></div>
                </div>
            ) : categories && categories.length > 0 ? (
                <div className="row g-3">
                    {categories.map((category) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={category.slug}>
                            <div
                                className="card h-100 text-center shadow-sm hover-shadow"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/category/${category.slug}`)}
                            >
                                <img
                                    src={category.categoryImg || "/placeholder.png"}
                                    className="card-img-top p-2"
                                    alt={category.categoryName}
                                    style={{ height: "100px", objectFit: "contain" }}
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

            {renderPagination()}
        </div>
    );
};

export default Categories;
