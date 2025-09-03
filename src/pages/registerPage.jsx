import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const Register=lazy(()=>import("../components/register.jsx"));

const HomePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Register/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default HomePage;