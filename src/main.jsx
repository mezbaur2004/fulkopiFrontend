import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store/store.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/style.css"

import "bootstrap-icons/font/bootstrap-icons.css";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {StrictMode} from "react";

const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!clientId) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is missing");
}
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <App/>
        </GoogleOAuthProvider>
        </StrictMode>
    </Provider>
)