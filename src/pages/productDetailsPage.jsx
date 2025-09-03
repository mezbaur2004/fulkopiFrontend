import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
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