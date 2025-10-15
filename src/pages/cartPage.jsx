import {Fragment, lazy, Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"

const Cart = lazy(() => import("../components/cart.jsx"));

const CartPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Cart/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CartPage;