import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const Products=lazy(()=>import("../components/products.jsx"));

const HomePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Products/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default HomePage;