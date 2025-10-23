import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import { createProduct, readBrand, readCategory } from "../../APIRequest/AdminAPIRequest.js";
import { ErrorToast } from "../../helper/formHelper.js";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // search + selected state for both controls
    const [brandQuery, setBrandQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(null);

    const [categoryQuery, setCategoryQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const brandList = await readBrand();
                setBrands(brandList.data || []);
                const catList = await readCategory();
                setCategories(catList.data || []);
            } catch (err) {
                console.error("Failed to load brands/categories", err);
            }
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
                    schema.typeError("Discount Price must be a number").required("Discount Price is required"),
                otherwise: (schema) => schema.nullable(),
            }),
        status: Yup.boolean().required("Select status"),
        stock: Yup.boolean().required("Select stock option"),
        image: Yup.string().required("Image URL is required"),
        remarks: Yup.string().required("Remarks is required"),
        brandID: Yup.string().required("Select brand"),
        categoryID: Yup.string().required("Select category"),
    });

    // shown lists: top 5 when empty, otherwise filtered results
    const getFiltered = (list, query, nameKey = "brandName") => {
        if (!list || list.length === 0) return [];
        if (!query || !query.trim()) return list.slice(0, 3);
        const q = query.trim().toLowerCase();
        return list.filter((x) => (x[nameKey] || x.name || x.slug || "").toLowerCase().includes(q)).slice(0, 50);
    };

    const filteredBrands = getFiltered(brands, brandQuery, "brandName");
    const filteredCategories = getFiltered(categories, categoryQuery, "categoryName");

    const handleSubmit = async (values, { resetForm }) => {
        setSubmitting(true);
        try {
            const res = await createProduct(
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

            if (res && res.status === "success") {
                resetForm();
                setBrandQuery("");
                setSelectedBrand(null);
                setCategoryQuery("");
                setSelectedCategory(null);
                navigate("/admin/products");
                return;
            }
            ErrorToast("Failed to create product");
        } catch (err) {
            console.error(err);
            ErrorToast("Failed to create product");
        } finally {
            setSubmitting(false);
        }
    };

    document.title = "Admin | Product | Create";

    // small helper classes (kept inline for copy-paste convenience)
    const optionBaseClass = "p-2 mb-1 rounded border";
    const selectedClass = "bg-success text-white";
    const normalClass = "bg-light";

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4 text-success">Create Product</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form className="row g-4" autoComplete="off">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Title</label>
                                <Field name="title" className="form-control" />
                                <ErrorMessage name="title" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Description</label>
                                <Field name="des" className="form-control" />
                                <ErrorMessage name="des" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Price</label>
                                <Field name="price" type="number" className="form-control" />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Discount</label>
                                <Field
                                    as="select"
                                    name="discount"
                                    className="form-select text-success"
                                    value={values.discount === true ? "true" : values.discount === false ? "false" : ""}
                                    onChange={(e) => setFieldValue("discount", e.target.value === "true")}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                                <ErrorMessage name="discount" component="div" className="text-danger" />
                            </div>

                            {values.discount && (
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Discount Price</label>
                                    <Field name="discountPrice" type="number" className="form-control" />
                                    <ErrorMessage name="discountPrice" component="div" className="text-danger" />
                                </div>
                            )}

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Status</label>
                                <Field
                                    as="select"
                                    name="status"
                                    className="form-select text-success"
                                    value={values.status === true ? "true" : values.status === false ? "false" : ""}
                                    onChange={(e) => setFieldValue("status", e.target.value === "true")}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Image URL</label>
                                <Field name="image" className="form-control" placeholder="https://example.com/image.jpg" />
                                <ErrorMessage name="image" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Stock</label>
                                <Field
                                    as="select"
                                    name="stock"
                                    className="form-select text-success"
                                    value={values.stock === true ? "true" : values.stock === false ? "false" : ""}
                                    onChange={(e) => setFieldValue("stock", e.target.value === "true")}
                                >
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </Field>
                                <ErrorMessage name="stock" component="div" className="text-danger" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Remarks</label>
                                <Field name="remarks" className="form-control" />
                                <ErrorMessage name="remarks" component="div" className="text-danger" />
                            </div>

                            {/* BRAND selector - search + clickable options */}
                            <div className="col-md-3">
                                <label className="form-label fw-bold">Brand</label>

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Search brand..."
                                    value={
                                        // show selected brand name if selected, otherwise the typed query
                                        (selectedBrand && brands.find((b) => b._id === selectedBrand)?.brandName) || brandQuery
                                    }
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setBrandQuery(v);
                                        // clear selection while typing
                                        setSelectedBrand(null);
                                        setFieldValue("brandID", "");
                                    }}
                                />

                                <div
                                    className="brand-options-container border p-2"
                                    style={{ maxHeight: "160px", overflowY: "auto" }}
                                >
                                    {filteredBrands.length === 0 ? (
                                        <div className="text-muted text-center">No brands found</div>
                                    ) : (
                                        filteredBrands.map((b) => {
                                            const isSelected = selectedBrand === b._id;
                                            return (
                                                <div
                                                    key={b._id}
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => {
                                                        setSelectedBrand(b._id);
                                                        setBrandQuery(""); // clear query but you can keep if you prefer showing name
                                                        setFieldValue("brandID", b._id);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === " ") {
                                                            setSelectedBrand(b._id);
                                                            setBrandQuery("");
                                                            setFieldValue("brandID", b._id);
                                                        }
                                                    }}
                                                    className={`${optionBaseClass} ${isSelected ? selectedClass : normalClass}`}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>{b.brandName || b.name || b.slug}</div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <ErrorMessage name="brandID" component="div" className="text-danger" />
                            </div>

                            {/* CATEGORY selector - same UI as brand */}
                            <div className="col-md-3">
                                <label className="form-label fw-bold">Category</label>

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Search category..."
                                    value={
                                        (selectedCategory && categories.find((c) => c._id === selectedCategory)?.categoryName) ||
                                        categoryQuery
                                    }
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setCategoryQuery(v);
                                        setSelectedCategory(null);
                                        setFieldValue("categoryID", "");
                                    }}
                                />

                                <div
                                    className="category-options-container border p-2"
                                    style={{ maxHeight: "160px", overflowY: "auto" }}
                                >
                                    {filteredCategories.length === 0 ? (
                                        <div className="text-muted text-center">No categories found</div>
                                    ) : (
                                        filteredCategories.map((c) => {
                                            const isSelected = selectedCategory === c._id;
                                            return (
                                                <div
                                                    key={c._id}
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => {
                                                        setSelectedCategory(c._id);
                                                        setCategoryQuery("");
                                                        setFieldValue("categoryID", c._id);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === " ") {
                                                            setSelectedCategory(c._id);
                                                            setCategoryQuery("");
                                                            setFieldValue("categoryID", c._id);
                                                        }
                                                    }}
                                                    className={`${optionBaseClass} ${isSelected ? selectedClass : normalClass}`}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>{c.categoryName || c.name || c.slug}</div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <ErrorMessage name="categoryID" component="div" className="text-danger" />
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
