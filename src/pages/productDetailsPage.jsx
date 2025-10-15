import {Fragment, lazy, Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"

const ProductDetails = lazy(() => import("../components/productDetails.jsx"));

const ProductDetailsPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductDetails/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductDetailsPage;