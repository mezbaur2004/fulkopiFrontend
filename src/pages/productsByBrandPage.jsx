import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const ProductsByBrand=lazy(()=>import("../components/productsByBrand.jsx"));

const ProductsByBrandPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <ProductsByBrand />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductsByBrandPage;