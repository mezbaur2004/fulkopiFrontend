// src/pages/CreateBrand.jsx
import React, {useRef, useState} from "react";
import {createBrand} from "../../APIRequest/AdminAPIRequest.js";
import {ErrorToast} from "../../helper/formHelper.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";

const CreateBrand = () => {
    const brandNameRef = useRef();
    const brandImgRef = useRef();
    const statusRef = useRef();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const brandName = brandNameRef.current?.value || "";
        const brandImg = brandImgRef.current?.value || "";
        const status = statusRef.current?.value === "true";

        if (!brandName) {
            ErrorToast("Brand Name is required");
            setSubmitting(false);
            return;
        }

        try {
            const res = await createBrand(brandName, brandImg, status);
            if (res?.status === "success") {
                brandNameRef.current.value = "";
                brandImgRef.current.value = "";
                statusRef.current.value = "";
            }
        } catch (err) {
            ErrorToast("Failed to create brand");
        } finally {
            setSubmitting(false);
        }
    };

    document.title = `Admin | Brand | Create`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-success">Create Brand</h1>

                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <input ref={brandNameRef} placeholder="Brand Name" className="form-control" required/>
                    </div>

                    <div className="col-md-6">
                        <input ref={brandImgRef} placeholder="Brand Image URL" className="form-control"/>
                    </div>

                    <div className="col-md-6">
                        <select ref={statusRef} className="form-select text-success">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success" disabled={submitting}>
                            {submitting ? "Creating..." : "Create Brand"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminMasterLayout>
    );
};

export default CreateBrand;
