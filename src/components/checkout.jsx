import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createInvoice } from "../APIRequest/invoiceAPIRequest";
import { IsEmpty, IsMobile, SuccessToast, ErrorToast } from "../helper/formHelper.js";

const Checkout = () => {
    const navigate = useNavigate();

    // refs for inputs
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const postcodeRef = useRef(null);

    // --- Cart Data from Redux ---
    const cartList = useSelector((state) => state.carts.List || []);
    const subtotal = cartList.reduce((acc, item) => {
        const price = item.product.discount ? item.product.discountPrice : item.product.price;
        return acc + price * item.qty;
    }, 0);

    const deliveryCharge = 110; // flat fee
    const total = subtotal + deliveryCharge;

    // --- Submit ---
    const handleSubmit = async (e) => {
        e && e.preventDefault();

        // read values from refs (guard null)
        const cus_name = (nameRef.current && nameRef.current.value) || "";
        const cus_phone = (phoneRef.current && phoneRef.current.value) || "";
        const cus_location = (addressRef.current && addressRef.current.value) || "";
        const cus_city = (cityRef.current && cityRef.current.value) || "";
        const cus_postcode = (postcodeRef.current && postcodeRef.current.value) || "";

        // validation using helpers
        if (IsEmpty(cus_name)) return ErrorToast("Name is required");
        if (IsEmpty(cus_location)) return ErrorToast("Address is required");
        if (IsEmpty(cus_city)) return ErrorToast("City is required");
        if (!IsMobile(cus_phone)) return ErrorToast("Invalid phone number");
        if (IsEmpty(cus_postcode)) return ErrorToast("Postcode is required");

        try {
            // call API with explicit params (no spread)
            const res=await createInvoice(
                cus_name,
                cus_location,
                cus_city,
                cus_phone,
                cus_postcode
            );

            console.log(res)
            if (res) {
                SuccessToast("Invoice Created Successfully");
                window.location.href =res; // or navigate to orders/invoice page
            } else {
                ErrorToast(res?.message || "Failed to create invoice");
            }
        } catch (err) {
            console.error(err);
            ErrorToast("Something went wrong");
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                {/* Left - Customer Form */}
                <div className="col-lg-8 mb-4">
                    <div className="card shadow-sm p-4">
                        <h4 className="mb-4 text-muted">Billing Details</h4>

                        <form onSubmit={handleSubmit} className="row g-3">
                            {/* Name */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Full Name</label>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    className="form-control"
                                    name="cus_name"
                                    placeholder="Full name"
                                />
                            </div>

                            {/* Phone */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone</label>
                                <input
                                    ref={phoneRef}
                                    type="tel"
                                    className="form-control"
                                    name="cus_phone"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>

                            {/* Address */}
                            <div className="col-12">
                                <label className="form-label fw-semibold">Address</label>
                                <input
                                    ref={addressRef}
                                    type="text"
                                    className="form-control"
                                    name="cus_location"
                                    placeholder="Street, area, house no."
                                />
                            </div>

                            {/* City */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">City</label>
                                <input
                                    ref={cityRef}
                                    type="text"
                                    className="form-control"
                                    name="cus_city"
                                    placeholder="City"
                                />
                            </div>

                            {/* Postcode */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Postcode</label>
                                <input
                                    ref={postcodeRef}
                                    type="text"
                                    className="form-control"
                                    name="cus_postcode"
                                    placeholder="Postal code"
                                />
                            </div>

                            {/* Submit (mobile only inside form) */}
                            <div className="col-12 text-end d-lg-none">
                                <button type="submit" className="btn btn-success fw-bold px-4">
                                    Confirm & Pay ✅
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right - Order Summary */}
                <div className="col-lg-4">
                    <div className="card shadow-sm p-4">
                        <h5 className="fw-bold text-muted mb-3">Order Summary</h5>

                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>{subtotal} tk</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Delivery Charge</span>
                            <span>{deliveryCharge} tk</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>{total} tk</span>
                        </div>

                        {/* Desktop submit in summary */}
                        <div className="text-end mt-4 d-none d-lg-block">
                            <button onClick={handleSubmit} className="btn btn-success fw-bold px-4">
                                Confirm & Pay ✅
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
