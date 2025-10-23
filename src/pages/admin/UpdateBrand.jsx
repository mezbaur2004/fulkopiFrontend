// src/pages/UpdateBrand.jsx
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {adminBrandDetails, updateBrand} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const UpdateBrand = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const initialValues = {
        brandName: brand?.brandName,
        status: brand?.status,
        brandImg: brand?.brandImg
    }

    const validationSchema = Yup.object().shape({
        brandName: Yup.string().required("Please enter the brand name"),
        status: Yup.boolean().required("Please enter the status"),
        brandImg: Yup.string().required("Please enter the category image link"),
    })
    useEffect(() => {
        (async () => {
            const data = await adminBrandDetails(id);
            setBrand(data);
        })();
    }, [id]);

    const handleUpdate = async (values, {resetForm}) => {
        setSubmitting(true);
        try {
            const res = await updateBrand(
                id,
                values.brandName,
                values.status,
                values.brandImg
                );
            if (res.status === "success") {
                navigate("/admin/brands");
                resetForm();
            }
        } catch (err) {

        } finally {
            setSubmitting(false);
        }
    };

    if (!brand) return <div className="p-3">Loading...</div>;

    document.title = `Admin | Brand | Update`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4 text-success">Update Brand</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}>
                    {({setFieldValue}) => (
                        <Form className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Brand Name</label>
                                <Field name="brandName" className="form-control"/>
                                <ErrorMessage name="brandName" component="div" className="text-danger"/>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Status</label>
                                <Field as="select" name="status" className="form-select text-success"
                                       onChange={(e) => setFieldValue("status", e.target.value === "true")}>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-danger"/>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Image URL</label>
                                <Field name="brandImg" className="form-control"
                                       placeholder="https://example.com/image.jpg"/>
                                <ErrorMessage name="brandImg" component="div" className="text-danger"/>
                            </div>
                            <div className="col-12 mt-3">
                                <button type="submit" className="btn btn-success" disabled={submitting}>
                                    {submitting ? "Creating..." : "Update Brand"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AdminMasterLayout>
    );
};

export default UpdateBrand;
