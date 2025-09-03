// src/components/MasterLayout.jsx
import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Badge, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { BsCartPlus, BsHeart } from "react-icons/bs";
import logo from '../../public/fulkopi.svg';
import { getUserDetails, removeSessions } from '../helper/sessionHelper';

/**
 * MasterLayout
 * - No sidebar
 * - All links in the header
 * - Shows dynamic login/profile state and cart/wishlist counts (from Redux)
 *
 * Adjust route paths below to match your frontend routing:
 *  - Products: '/products'  (or '/productList' based on your app)
 *  - Brands: '/brands'      (or '/brandList')
 *  - Categories: '/categories' (or '/categoryList')
 *  - Wishlist: '/wishlist'
 *  - Cart: '/cart'
 *  - Login/Register/Profile: '/login', '/register', '/profile'
 */

const MasterLayout = ({ children }) => {
    const navigate = useNavigate();

    // Safe get user details
    let userDetails = {};
    try {
        userDetails = getUserDetails() || {};
    } catch (err) {
        console.error("Error parsing user details:", err);
        userDetails = {};
    }

    // Read cart & wishlist counts from redux (adjust selectors to your slices)
    const cartCount = useSelector((state) => {
        // adjust path: state.cart.items or state.cartList, etc.
        const items = state.cart?.items ?? state.cartList ?? [];
        return Array.isArray(items) ? items.length : 0;
    });

    const wishCount = useSelector((state) => {
        // adjust path: state.wishlist.items or state.wishList
        const items = state.wishlist?.items ?? state.wishList ?? [];
        return Array.isArray(items) ? items.length : 0;
    });

    const onLogout = () => {
        removeSessions();           // your helper clears token/session
        // optionally dispatch logout redux action here if you have one
        navigate("/login");
    };

    return (
        <Fragment>
            <Navbar expand="lg" bg="dark" variant="dark" fixed="top" className="px-3">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
                        <Image src={logo} alt="Logo" height={36} className="me-2" />
                        <span className="fw-bold">MyShop</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-nav" />
                    <Navbar.Collapse id="main-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/brands">Brands</Nav.Link>
                            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
                        </Nav>

                        <Nav className="ms-auto align-items-center">
                            <Nav.Link as={NavLink} to="/wishlist" className="position-relative">
                                <BsHeart size={20} />
                                {wishCount > 0 && (
                                    <Badge bg="danger" pill className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-25%)' }}>
                                        {wishCount}
                                    </Badge>
                                )}
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/cart" className="position-relative ms-2">
                                <BsCartPlus size={20} />
                                {cartCount > 0 && (
                                    <Badge bg="danger" pill className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-25%)' }}>
                                        {cartCount}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {userDetails && userDetails.email ? (
                                <NavDropdown
                                    title={
                                        <span className="d-inline-flex align-items-center">
                      {userDetails.photo ? (
                          <img src={userDetails.photo} alt="user" className="rounded-circle" style={{ width: 28, height: 28, objectFit: 'cover' }} />
                      ) : (
                          <AiOutlineUser size={20} />
                      )}
                                            <span className="ms-2 d-none d-lg-inline">{userDetails.firstName || userDetails.email}</span>
                    </span>
                                    }
                                    id="user-nav-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={onLogout} className="text-danger">
                                        <AiOutlineLogout className="me-2" />
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/login" className="ms-2">Login</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register" className="ms-2">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* spacer so fixed-top navbar doesn't overlap content */}
            <div style={{ height: 70 }} />

            <main className="container-fluid px-3">
                {children}
            </main>
        </Fragment>
    );
};

export default MasterLayout;
