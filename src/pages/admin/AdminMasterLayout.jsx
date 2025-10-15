import React, {useState} from "react";
import {NavLink} from "react-router-dom";

export default function AdminMasterLayout({children}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const SidebarLink = ({to, children, end = false}) => (
        <NavLink
            to={to}
            end={end}
            className={({isActive}) =>
                "nav-link d-block py-2 px-3 rounded mb-1" +
                (isActive ? " bg-success text-white fw-bold" : " text-dark")
            }
            onClick={() => setMobileOpen(false)}
        >
            {children}
        </NavLink>
    );

    return (
        <div className="d-flex">
            {/* Desktop sidebar */}
            <nav
                className="d-none d-md-block bg-light p-3 border-end border-3 border-success shadow-sm"
                style={{
                    width: "240px",
                    minHeight: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflowY: "auto",
                }}
            >
                <h5 className="mb-3 text-success">Admin Panel</h5>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <SidebarLink to="/admin" end>Dashboard</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Products</strong>
                        <SidebarLink to="/admin/products">Manage Products</SidebarLink>
                        <SidebarLink to="/admin/createproduct">Create Product</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Brands</strong>
                        <SidebarLink to="/admin/brands">Manage Brands</SidebarLink>
                        <SidebarLink to="/admin/createbrand">Create Brand</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Categories</strong>
                        <SidebarLink to="/admin/categories">Manage Categories</SidebarLink>
                        <SidebarLink to="/admin/createcategory">Create Category</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Users & Invoices</strong>
                        <SidebarLink to="/admin/userlist">View Users</SidebarLink>
                        <SidebarLink to="/admin/invoicelist">View Invoices</SidebarLink>
                    </li>
                </ul>
            </nav>

            {/* Mobile toggle */}
            <div
                className="d-md-none w-100 p-2 border-bottom d-flex justify-content-between align-items-center bg-light border-success border-3">
                <h6 className="mb-0 text-success">Admin</h6>
                <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Mobile sidebar overlay */}
            <div
                id="mobile-sidebar"
                className={`d-md-none position-fixed top-0 start-0 bg-light border-end border-3 border-success shadow-sm p-3`}
                style={{
                    width: "80%",
                    height: "100vh",
                    zIndex: 1040,
                    overflowY: "auto",
                    display: mobileOpen ? "block" : "none",
                }}
            >
                <div className="d-flex justify-content-between mb-3">
                    <strong className="text-success">Admin</strong>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setMobileOpen(false)}
                    >
                        Close
                    </button>
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <SidebarLink to="/admin" end>Dashboard</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Products</strong>
                        <SidebarLink to="/admin/products">Manage Products</SidebarLink>
                        <SidebarLink to="/admin/createproduct">Create Product</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Brands</strong>
                        <SidebarLink to="/admin/brands">Manage Brands</SidebarLink>
                        <SidebarLink to="/admin/createbrand">Create Brand</SidebarLink>
                    </li>
                    <li className="nav-item mt-3">
                        <strong className="small text-success">Categories</strong>
                        <SidebarLink to="/admin/categories">Manage Categories</SidebarLink>
                        <SidebarLink to="/admin/createcategory">Create Category</SidebarLink>
                    </li>

                </ul>
            </div>

            {/* Main content */}
            <main
                className="flex-grow-1 p-4"
                style={{
                    marginLeft: window.innerWidth >= 768 ? "240px" : "0",
                    overflowX: "auto",
                    minHeight: "100vh",
                    transition: "margin-left 0.3s",
                }}
            >
                {children}
            </main>
        </div>
    );
}
