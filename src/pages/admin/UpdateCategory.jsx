import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminCategoryDetails, updateCategory } from "../../APIRequest/AdminAPIRequest.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);

    const categoryNameRef = useRef();
    const categoryImgRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        (async () => {
            const data = await adminCategoryDetails(id);
            setCategory(data);
        })();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const body = {
            categoryName: categoryNameRef.current.value,
            categoryImg: categoryImgRef.current.value,
            status: statusRef.current.value === "true",
        };
        const res = await updateCategory(id, body);
        if (res?.status === "success") {
            navigate("/admin/categories");
        }
    };

    if (!category) return <div className="p-3">Loading...</div>;

    return (

        <>
            <AdminHeaderComponent/>

        <div className="container py-4">
            <h2 className="mb-4">Update Category</h2>
            <form onSubmit={handleUpdate} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Category Name</label>
                    <input
                        ref={categoryNameRef}
                        defaultValue={category.categoryName}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Category Image URL</label>
                    <input
                        ref={categoryImgRef}
                        defaultValue={category.categoryImg}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                        ref={statusRef}
                        defaultValue={category.status ? "true" : "false"}
                        className="form-select"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary mt-3">Update Category</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default UpdateCategory;
