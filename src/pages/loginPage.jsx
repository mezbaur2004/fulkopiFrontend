import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const Login=lazy(()=>import("../components/login.jsx"));

const LoginPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Login/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default LoginPage;