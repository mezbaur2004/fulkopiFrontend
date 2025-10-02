import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setToken, setUserDetails } from '../helper/sessionHelper.js';
import { useNavigate } from 'react-router-dom';
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {SuccessToast} from "../helper/formHelper.js";

const url = import.meta.env.VITE_BASE_URL;

const Google = ({ onLoginSuccess }) => {  // optional callback
    const navigate = useNavigate();

    const handleLogin = async (credentialResponse) => {
        try {
            store.dispatch(ShowLoader());
            const googleIdToken = credentialResponse.credential;

            // Send Google ID token to backend
            const { data } = await axios.post(`${url}google`, { token: googleIdToken });

            // Store JWT and user details
            setToken(data.token);
            setUserDetails(data.user);
            SuccessToast("Login Success");
            store.dispatch(HideLoader());
            // Callback to notify parent/layout that user is logged in
            if (onLoginSuccess) onLoginSuccess();

            // Navigate to homepage/dashboard
            window.location.href = "/";
        } catch (err) {
            store.dispatch(HideLoader());
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
