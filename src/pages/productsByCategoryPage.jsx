import {Fragment, lazy, Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"

const ProductsByCategory = lazy(() => import("../components/./productsByCategory"));

const ProductsByCategoryPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductsByCategory/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductsByCategoryPage;