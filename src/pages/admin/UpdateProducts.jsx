import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminMasterLayout from "./AdminMasterLayout.jsx";
import { adminProductDetails, readBrand, readCategory, updateProduct } from "../../APIRequest/AdminAPIRequest.js";
import { ErrorToast } from "../../helper/formHelper.js";

const UpdateProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productDetails, setProductDetails] = useState(null);

    const [brandQuery, setBrandQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(null);

    const [categoryQuery, setCategoryQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await adminProductDetails(id);
            setProductDetails(data);

            const brandList = await readBrand();
            setBrands(brandList.data || []);

            const catList = await readCategory();
            setCategories(catList.data || []);

            if (data) {
                setSelectedBrand(data.brandID?String(data.brandID):"");
                setSelectedCategory(data.categoryID?String(data.categoryID):"");
            }
        })();
    }, [id]);

    if (!productDetails) return <div className="p-3">Loading...</div>;

    const initialValues = {
        title: productDetails.title || "",
        des: productDetails.des || "",
        price: productDetails.price || "",
        discount: productDetails.discount || false,
        discountPrice: productDetails.discountPrice || "",
        status: productDetails.status || true,
        stock: productDetails.stock || true,
        image: productDetails.image || "",
        remarks: productDetails.remarks || "",
        brandID: selectedBrand || "",
        categoryID: selectedCategory || "",
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
                then: (schema) => schema.typeError("Discount Price must be a number").required("Discount Price is required"),
                otherwise: (schema) => schema.nullable(),
            }),
        status: Yup.boolean().required("Select status"),
        stock: Yup.boolean().required("Select stock option"),
        image: Yup.string().required("Image URL is required"),
        remarks: Yup.string().required("Remarks is required"),
        brandID: Yup.string().required("Select brand"),
        categoryID: Yup.string().required("Select category"),
    });

    const getFiltered = (list = [], query, keyName) => {
        if (!Array.isArray(list)) return [];
        if (!query?.trim()) return list.slice(0, 3);
        return list
            .filter((x) => (x[keyName] || x.slug || "").toLowerCase().includes(query.toLowerCase()))
            .slice(0, 50);
    };


    const handleSubmit = async (values) => {
        try {
            const res = await updateProduct(id, {
                ...values,
                price: Number(values.price),
                discountPrice: values.discount ? Number(values.discountPrice) : null,
            });
            if (res?.status === "success") {
                navigate("/admin/products");
            } else {
                ErrorToast("Failed to update product");
            }
        } catch (err) {

            ErrorToast("Failed to update product");
        }
    };

    document.title = `Admin | Product | Update`;

    const optionBaseClass = "p-2 mb-1 rounded border";
    const selectedClass = "bg-success text-white";
    const normalClass = "bg-light";

    return (
        <AdminMasterLayout>
            <div className="container py-4">
                <h2 className="mb-4 text-success">Update Product</h2>

                <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => {
                        const filteredBrands = getFiltered(brands, brandQuery, "brandName");
                        const filteredCategories = getFiltered(categories, categoryQuery, "categoryName");

                        return (
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
                                        onChange={(e) => setFieldValue("discount", e.target.value === "true")}
                                        value={values.discount === true ? "true" : values.discount === false ? "false" : ""}
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
                                        onChange={(e) => setFieldValue("status", e.target.value === "true")}
                                        value={values.status === true ? "true" : values.status === false ? "false" : ""}
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Image URL</label>
                                    <Field name="image" className="form-control" />
                                    <ErrorMessage name="image" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Stock</label>
                                    <Field
                                        as="select"
                                        name="stock"
                                        className="form-select text-success"
                                        onChange={(e) => setFieldValue("stock", e.target.value === "true")}
                                        value={values.stock === true ? "true" : values.stock === false ? "false" : ""}
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

                                {/* Brand */}
                                <div className="col-md-3">
                                    <label className="form-label fw-bold">Brand</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Search brand..."
                                        value={(selectedBrand && brands.find((b) => b._id === selectedBrand)?.brandName) || brandQuery}
                                        onChange={(e) => {
                                            setBrandQuery(e.target.value);
                                            setSelectedBrand(null);
                                            setFieldValue("brandID", "");
                                        }}
                                    />
                                    <div className="border p-2" style={{ maxHeight: "160px", overflowY: "auto" }}>
                                        {filteredBrands.length === 0 ? (
                                            <div className="text-muted text-center">No brands found</div>
                                        ) : (
                                            filteredBrands.map((b) => {
                                                const isSelected = selectedBrand === b._id;
                                                return (
                                                    <div
                                                        key={b._id}
                                                        onClick={() => {
                                                            setSelectedBrand(b._id);
                                                            setBrandQuery("");
                                                            setFieldValue("brandID", b._id);
                                                        }}
                                                        className={`${optionBaseClass} ${isSelected ? selectedClass : normalClass}`}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {b.brandName || b.name || b.slug}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                    <ErrorMessage name="brandID" component="div" className="text-danger" />
                                </div>

                                {/* Category */}
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
                                            setCategoryQuery(e.target.value);
                                            setSelectedCategory(null);
                                            setFieldValue("categoryID", "");
                                        }}
                                    />
                                    <div className="border p-2" style={{ maxHeight: "160px", overflowY: "auto" }}>
                                        {filteredCategories.length === 0 ? (
                                            <div className="text-muted text-center">No categories found</div>
                                        ) : (
                                            filteredCategories.map((c) => {
                                                const isSelected = selectedCategory === c._id;
                                                return (
                                                    <div
                                                        key={c._id}
                                                        onClick={() => {
                                                            setSelectedCategory(c._id);
                                                            setCategoryQuery("");
                                                            setFieldValue("categoryID", c._id);
                                                        }}
                                                        className={`${optionBaseClass} ${isSelected ? selectedClass : normalClass}`}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {c.categoryName || c.name || c.slug}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                    <ErrorMessage name="categoryID" component="div" className="text-danger" />
                                </div>

                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Update Product
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </AdminMasterLayout>
    );
};

export default UpdateProducts;
