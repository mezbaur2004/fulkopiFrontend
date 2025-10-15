import {jwtDecode} from "jwt-decode";

class SessionHelper {
    // ===== TOKEN =====
    setToken(token) {
        if (!token) return;
        const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
        const tokenData = {token, expiry};
        localStorage.setItem("token", JSON.stringify(tokenData));
    }

    getToken() {
        const tokenData = JSON.parse(localStorage.getItem("token"));
        if (!tokenData) return null;

        if (Date.now() > tokenData.expiry) {
            localStorage.removeItem("token");
            return null;
        }

        return tokenData.token;
    }

    isAdmin() {
        const tokenData = JSON.parse(localStorage.getItem("token"));
        if (!tokenData) return null;

        if (Date.now() > tokenData.expiry) {
            localStorage.removeItem("token");
            return null;
        }

        const decoded = jwtDecode(tokenData.token);
        if (decoded.role === "admin") {
            return true
        } else {
            return false
        }
    }

    // ===== USER DETAILS =====
    setUserDetails(userDetails) {
        if (!userDetails) return;
        const expiry = Date.now() + 10 * 24 * 60 * 60 * 1000; // 10 days
        const data = {userDetails, expiry};
        localStorage.setItem("UserDetails", JSON.stringify(data));
    }

    getUserDetails() {
        const data = JSON.parse(localStorage.getItem("UserDetails"));
        if (!data) return null;

        if (Date.now() > data.expiry) {
            localStorage.removeItem("UserDetails");
            return null;
        }

        return data.userDetails;
    }

    // ===== REMOVE SESSION =====
    removeSessions = () => {
        localStorage.clear();
        window.location.href = "/login";
    }
}

export const {
    setToken,
    getToken,
    isAdmin,
    setUserDetails,
    getUserDetails,
    removeSessions
} = new SessionHelper();