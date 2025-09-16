import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const InvoiceProduct=lazy(()=>import("../components/invoiceProduct.jsx"));

const InvoiceProductPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <InvoiceProduct/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default InvoiceProductPage;