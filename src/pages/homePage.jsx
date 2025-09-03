import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/masterLayout";
import LazyLoader from "../components/lazyLoader"
const Home=lazy(()=>import("../components/home.jsx"));

const HomePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Home/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default HomePage;