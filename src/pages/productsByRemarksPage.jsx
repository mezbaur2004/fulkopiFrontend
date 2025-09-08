import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const ProductsByRemarks=lazy(()=>import("../components/productsByRemarks.jsx"));

const ProductsByRemarksPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <ProductsByRemarks />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductsByRemarksPage;