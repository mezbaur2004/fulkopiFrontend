import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminBrandDetails, updateBrand } from "../../APIRequest/AdminAPIRequest.js";
import AdminHeaderComponent from "./AdminHeaderComponent.jsx";

const UpdateBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState(null);

    const brandNameRef = useRef();
    const brandImgRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        (async () => {
            const data = await adminBrandDetails(id);
            setBrand(data);
        })();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const body = {
            brandName: brandNameRef.current.value,
            brandImg: brandImgRef.current.value,
            status: statusRef.current.value === "true",
        };
        const res = await updateBrand(id, body);
        if (res?.status === "success") {
            navigate("/admin/brands");
        }
    };

    if (!brand) return <div className="p-3">Loading...</div>;

    return (
        <>
            <AdminHeaderComponent/>
        <div className="container py-4">
            <h2 className="mb-4">Update Brand</h2>
            <form onSubmit={handleUpdate} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Brand Name</label>
                    <input ref={brandNameRef} defaultValue={brand.brandName} className="form-control" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Brand Image URL</label>
                    <input ref={brandImgRef} defaultValue={brand.brandImg} className="form-control" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select ref={statusRef} defaultValue={brand.status ? "true" : "false"} className="form-select">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary mt-3">Update Brand</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default UpdateBrand;
