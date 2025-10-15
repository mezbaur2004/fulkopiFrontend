import {Fragment, lazy, Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"

const Brands = lazy(() => import("../components/brands.jsx"));

const BrandsPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Brands/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BrandsPage;