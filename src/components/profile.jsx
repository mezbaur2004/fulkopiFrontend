import React, {useEffect} from "react";
import {userDetails} from "../APIRequest/userAPIRequest.js";
import {useSelector} from "react-redux";

const Profile = () => {
    useEffect(() => {
        (async () => {
            await userDetails();
        })();
    }, []);

    let profileDetails = useSelector((state) => state.users.List);

    if (!profileDetails || profileDetails.length === 0) {
        return (
            <div className="flex justify-center items-center mt-20">
                <p className="text-lg font-semibold text-gray-800 animate-pulse">
                    Loading profile...
                </p>
            </div>
        );
    }

    const profile = profileDetails[0]; // since API returns array

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-200 abcd">
            {/* Top Section */}
            <div className="flex flex-col items-center">
                <img
                    src={profile.photo}
                    alt="User Avatar"
                    className="w-28 h-28 rounded-full shadow-lg border-4 border-white"
                />

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-900">{profile.email}</p>
                <span
                    className={`mt-2 px-4 py-1 text-sm font-medium rounded-full ${
                        profile.provider === "google"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                >
          {profile.provider === "google" ? "Google Account" : "Custom Account"}
        </span>
            </div>

            {/* Info Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs uppercase text-gray-700">Mobile</p>
                    <p className="mt-1 text-gray-900 font-semibold">
                        {profile.mobile || "Not provided"}
                    </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs uppercase text-gray-700">Joined</p>
                    <p className="mt-1 text-gray-900 font-semibold">
                        {new Date(profile.createdDate).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
