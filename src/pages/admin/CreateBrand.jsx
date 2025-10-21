// src/pages/CreateBrand.jsx
import React, {useState} from "react";
import {createBrand} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const CreateBrand = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const initialValues = {
        brandName: "",
        status: true,
        brandImg: ""
    }

    const validationSchema = Yup.object().shape({
        brandName: Yup.string().required("Please enter the brand name"),
        status: Yup.boolean().required("Please enter the status"),
        brandImg: Yup.string().required("Please enter the category image link"),
    })

    const handleSubmit = async (values, {resetForm}) => {
        setSubmitting(true);
        try {
            const res = await createBrand(
                values.brandName,
                values.status,
                values.brandImg,
            );
            if(res.status ==="success") {
                navigate("/admin/brands");
                resetForm();
            }
        } catch (err) {
            console.error("Create brand failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    document.title = `Admin | Brand | Create`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-success">Create Brand</h1>

                <Formik
                    initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
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
                                    {submitting ? "Creating..." : "Create Category"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AdminMasterLayout>
    );
};

export default CreateBrand;
