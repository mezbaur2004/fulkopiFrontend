// src/pages/UpdateBrand.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminBrandDetails, updateBrand } from "../../APIRequest/AdminAPIRequest.js";
import { ErrorToast, SuccessToast } from "../../helper/formHelper.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const UpdateBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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

        const brandName = brandNameRef.current?.value || "";
        if (!brandName) {
            ErrorToast("Brand name is required");
            return;
        }

        setSubmitting(true);
        const body = {
            brandName,
            brandImg: brandImgRef.current?.value || "",
            status: statusRef.current?.value === "true",
        };

        try {
            const res = await updateBrand(id, body);
            if (res?.status === "success") {
                navigate("/admin/brands");
            } else {
                ErrorToast("Failed to update brand");
            }
        } catch (err) {
            ErrorToast("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    if (!brand) return <div className="p-3">Loading...</div>;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4 text-success">Update Brand</h2>

                <form onSubmit={handleUpdate} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Brand Name</label>
                        <input ref={brandNameRef} defaultValue={brand.brandName} className="form-control" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Brand Image URL</label>
                        <input ref={brandImgRef} defaultValue={brand.brandImg} className="form-control" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold">Status</label>
                        <select
                            ref={statusRef}
                            defaultValue={brand.status ? "true" : "false"}
                            className="form-select text-success"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success mt-3" disabled={submitting}>
                            {submitting ? "Updating..." : "Update Brand"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminMasterLayout>
    );
};

export default UpdateBrand;
