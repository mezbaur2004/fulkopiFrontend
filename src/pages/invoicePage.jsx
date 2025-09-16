import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const Invoice=lazy(()=>import("../components/invoice.jsx"));

const InvoicePage= () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Invoice/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default InvoicePage;