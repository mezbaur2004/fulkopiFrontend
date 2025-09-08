import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const ProductsByKeyword=lazy(()=>import("../components/productsByKeyword.jsx"));

const ProductsByKeywordPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <ProductsByKeyword />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductsByKeywordPage;