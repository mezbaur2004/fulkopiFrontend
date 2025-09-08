import {Fragment,lazy,Suspense} from "react";
import MasterLayout from "../components/layout&loaders/masterLayout.jsx";
import LazyLoader from "../components/layout&loaders/lazyLoader.jsx"
const Profile=lazy(()=>import("../components/profile.jsx"));

const ProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProfilePage;