import {Fragment, lazy, Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"

const Categories = lazy(() => import("../components/categories.jsx"));

const CategoriesPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Categories/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoriesPage;