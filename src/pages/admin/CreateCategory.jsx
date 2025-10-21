// src/pages/CreateCategory.jsx
import React, {useState} from "react";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import {createCategory} from "../../APIRequest/AdminAPIRequest.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const CreateCategory = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const initialValues = {
        categoryName: "",
        status: true,
        categoryImg: ""
    }

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required("Please enter the category name"),
        status: Yup.boolean().required("Please enter the status"),
        categoryImg: Yup.string().required("Please enter the category image link"),
    })

    const handleSubmit = async (values, {resetForm}) => {
        setSubmitting(true);
        try {
            const res = await createCategory(
                values.categoryName,
                values.status,
                values.categoryImg,
            );
            if(res.status ==="success") {
                navigate("/admin/categories");
                resetForm();
            }
        } catch (err) {
            console.error("Create cat failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    document.title = `Admin | Category | Category`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-success">Create Category</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >{({setFieldValue}) => (
                    <Form className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Category Name</label>
                            <Field name="categoryName" className="form-control"/>
                            <ErrorMessage name="categoryName" component="div" className="text-danger"/>
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
                            <Field name="categoryImg" className="form-control"
                                   placeholder="https://example.com/image.jpg"/>
                            <ErrorMessage name="categoryImg" component="div" className="text-danger"/>
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

export default CreateCategory;
