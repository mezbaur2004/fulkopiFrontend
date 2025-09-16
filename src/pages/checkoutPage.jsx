import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const Checkout=lazy(()=>import("../components/checkout.jsx"));
const CheckoutPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Checkout/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CheckoutPage;