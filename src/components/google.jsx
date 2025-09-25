import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Google = () => {
    const handleLogin = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            console.log("ID Token:", token);

            const { data } = await axios.post('http://localhost:3030/api/google', { token });
            console.log("Backend Response:", data);

            // optionally, save your app JWT in localStorage or Redux
            localStorage.setItem("token", data.token);
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
        }
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log('Login Failed')}
            />
        </div>
    );
};

export default Google;
