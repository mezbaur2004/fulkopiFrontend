// src/pages/UpdateCategory.jsx
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {adminCategoryDetails, updateCategory} from "../../APIRequest/AdminAPIRequest.js";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const UpdateCategory = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const initialValues = {
        categoryName: category?.categoryName,
        status: true,
        categoryImg: category?.categoryImg
    }

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required("Please enter the category name"),
        status: Yup.boolean().required("Please enter the status"),
        categoryImg: Yup.string().required("Please enter the category image link"),
    })
    useEffect(() => {
        (async () => {
            const data = await adminCategoryDetails(id);
            setCategory(data);
        })();
    }, [id]);

    const handleUpdate = async (values, {resetForm}) => {
        setSubmitting(true);
        try{
            const res=await updateCategory(
                id,
                values.categoryName,
                values.status,
                values.categoryImg
                );
            if (res.status === "success") {
                navigate("/admin/categories");
                resetForm();
            }
        }catch(err){
            console.error("Category Update Failed",err);
        }finally {
            setSubmitting(false);
        }
    };

    if (!category) return <div className="p-3">Loading...</div>;

    document.title = `Admin | Category | Update`;

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h1 className="mb-4 text-muted">Update Category</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}>
                    {({setFieldValue}) => (
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
                                    {submitting ? "Creating..." : "Update Category"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AdminMasterLayout>
    );
};

export default UpdateCategory;
