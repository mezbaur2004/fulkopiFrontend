import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import {createProduct, readBrand, readCategory} from "../../APIRequest/AdminAPIRequest.js";
import {ErrorToast} from "../../helper/formHelper.js";

const CreateProduct = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            const brandList = await readBrand();
            setBrands(brandList || []);

            const catList = await readCategory();
            setCategories(catList || []);
        })();
    }, []);

    const initialValues = {
        title: "",
        des: "",
        price: "",
        discount: false,
        discountPrice: "",
        status: true,
        stock: true,
        image: "",
        remarks: "",
        brandID: "",
        categoryID: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        des: Yup.string().required("Description is required"),
        price: Yup.number().typeError("Price must be a number").required("Price is required"),
        discount: Yup.boolean().required("Select discount option"),
        discountPrice: Yup.number()
            .nullable()
            .when("discount", {
                is: (val) => val === true || val === "true",
                then: (schema) =>
                    schema
                        .typeError("Discount Price must be a number")
                        .required("Discount Price is required"),
                otherwise: (schema) => schema.nullable(),
            }),

        status: Yup.boolean().required("Select status"),
        stock: Yup.boolean().required("Select stock option"),
        image: Yup.string().required("Image URL is required"),
        remarks: Yup.string().required("Remarks is required"),
        brandID: Yup.string().required("Select brand"),
        categoryID: Yup.string().required("Select category"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        console.log(values);
        setSubmitting(true);
        try {
            await createProduct(
                values.title,
                values.des,
                Number(values.price),
                values.discount,
                values.discount ? Number(values.discountPrice) : null,
                values.status,
                values.image,
                values.stock,
                values.remarks,
                values.categoryID,
                values.brandID
            );
            resetForm();
        } catch (err) {
            console.error("Create product failed:", err);
            ErrorToast("Failed to create product");
        } finally {
            setSubmitting(false);
        }
    };

    document.title = "Admin | Product | Create";

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4 text-success">Create Product</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, setFieldValue}) => (
                        <Form className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Title</label>
                                <Field name="title" className="form-control" placeholder="Product Title"/>
                                <ErrorMessage name="title" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Description</label>
                                <Field name="des" className="form-control" placeholder="Description"/>
                                <ErrorMessage name="des" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Price</label>
                                <Field name="price" type="number" className="form-control" placeholder="Price"/>
                                <ErrorMessage name="price" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Discount</label>
                                <Field
                                    as="select"
                                    name="discount"
                                    className="form-select text-success"
                                    onChange={(e) => setFieldValue("discount", e.target.value === "true")}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                                <ErrorMessage name="discount" component="div" className="text-danger"/>
                            </div>

                            {values.discount && (
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Discount Price</label>
                                    <Field
                                        name="discountPrice"
                                        type="number"
                                        className="form-control"
                                        placeholder="Discount Price"
                                    />
                                    <ErrorMessage name="discountPrice" component="div" className="text-danger"/>
                                </div>
                            )}

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Status</label>
                                <Field
                                    as="select"
                                    name="status"
                                    className="form-select text-success"
                                    onChange={(e) => setFieldValue("status", e.target.value === "true")}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Image URL</label>
                                <Field name="image" className="form-control" placeholder="Image URL"/>
                                <ErrorMessage name="image" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Stock</label>
                                <Field
                                    as="select"
                                    name="stock"
                                    className="form-select text-success"
                                    onChange={(e) => setFieldValue("stock", e.target.value === "true")}
                                >
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </Field>
                                <ErrorMessage name="stock" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Remarks</label>
                                <Field name="remarks" className="form-control" placeholder="Remarks"/>
                                <ErrorMessage name="remarks" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Brand</label>
                                <Field as="select" name="brandID" className="form-select text-success">
                                    <option value="">Select Brand</option>
                                    {brands.map((b) => (
                                        <option key={b._id} value={b._id}>
                                            {b.brandName || b.name || b.slug}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="brandID" component="div" className="text-danger"/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Category</label>
                                <Field as="select" name="categoryID" className="form-select text-success">
                                    <option value="">Select Category</option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.categoryName || c.name || c.slug}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryID" component="div" className="text-danger"/>
                            </div>

                            <div className="col-12 mt-3">
                                <button type="submit" className="btn btn-success" disabled={submitting}>
                                    {submitting ? "Creating..." : "Create Product"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AdminMasterLayout>
    );
};

export default CreateProduct;
