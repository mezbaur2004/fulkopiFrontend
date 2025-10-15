import {Fragment, lazy, Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"

const Wish = lazy(() => import("../components/wish.jsx"));

const WishPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Wish/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default WishPage;