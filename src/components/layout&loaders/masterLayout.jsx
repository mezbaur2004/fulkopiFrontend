// src/components/MasterLayout.jsx
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Badge,
    Image,
    Row,
    Col,
    Form,
    Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { BsCartPlus, BsHeart } from "react-icons/bs";
import logo from '../../assets/fulkopi.svg';
import { getUserDetails, removeSessions } from '../../helper/sessionHelper.js';

/**
 * MasterLayout
 * - Navbar fixed-top
 * - Search moved to after user/cart/wish/logout group (end of navbar)
 * - Clear button removed
 * - Responsive: search stacks in collapse (mobile) and is inline on md+
 */

const MasterLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [keyword, setKeyword] = useState("");

    // prefill search if URL is /productbykeyword/:keyword
    useEffect(() => {
        const match = location.pathname.match(/^\/productbykeyword\/(.+)$/);
        if (match && match[1]) {
            try {
                setKeyword(decodeURIComponent(match[1]));
            } catch {
                setKeyword(match[1]);
            }
        }
    }, [location.pathname]);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        const q = String(keyword || "").trim();
        if (!q) {
            navigate("/products");
            return;
        }
        navigate(`/productbykeyword/${encodeURIComponent(q)}`);
    };

    // Safe get user details
    let userDetails = {};
    try {
        userDetails = getUserDetails() || {};
    } catch (err) {
        console.error("Error parsing user details:", err);
    }

    // Redux selectors for cart & wishlist counts (adjust slice names if needed)
    const cartCount = useSelector((state) => {
        const items = state.cart?.items ?? state.cartList ?? [];
        return Array.isArray(items) ? items.length : 0;
    });

    const wishCount = useSelector((state) => {
        const items = state.wishlist?.items ?? state.wishList ?? [];
        return Array.isArray(items) ? items.length : 0;
    });

    const onLogout = () => {
        removeSessions();
        navigate("/login");
    };

    return (
        <Fragment>
            <div className="d-flex flex-column min-vh-100">
                {/* Navbar (fixed) */}
                <Navbar expand="lg" bg="dark" variant="dark" fixed="top" className="px-3">
                    <Container fluid>
                        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
                            <Image src={logo} alt="Logo" height={36} className="me-2" />
                            <span className="fw-bold">Fulkopi</span>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="main-nav" />
                        <Navbar.Collapse id="main-nav">
                            {/* Left nav links */}
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                                <Nav.Link as={NavLink} to="/brands">Brands</Nav.Link>
                                <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
                            </Nav>

                            {/* spacer pushes the following groups to the right on wide screens */}
                            <div className="flex-grow-1" />

                            {/* Right-side links (user / cart / wishlist) */}
                            <Nav className="d-flex flex-column flex-lg-row align-items-start align-lg-items-center me-lg-2">
                                {userDetails?.email && (
                                    <>
                                        <Nav.Link as={NavLink} to="/wish" className="position-relative mb-2 mb-lg-0">
                                            <BsHeart size={20} />
                                            {wishCount > 0 && (
                                                <Badge bg="danger" pill className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-25%)' }}>
                                                    {wishCount}
                                                </Badge>
                                            )}
                                        </Nav.Link>

                                        <Nav.Link as={NavLink} to="/cart" className="position-relative mb-2 mb-lg-0 ms-0 ms-lg-2">
                                            <BsCartPlus size={20} />
                                            {cartCount > 0 && (
                                                <Badge bg="danger" pill className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-25%)' }}>
                                                    {cartCount}
                                                </Badge>
                                            )}
                                        </Nav.Link>
                                    </>
                                )}

                                {userDetails?.email ? (
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
                                        className="mb-2 mb-lg-0"
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
                                        <Nav.Link as={NavLink} to="/login" className="mb-2 mb-lg-0">Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="/register" className="mb-2 mb-lg-0 ms-0 ms-lg-2">Register</Nav.Link>
                                    </>
                                )}
                            </Nav>

                            {/* SEARCH - now placed AFTER the right-side links */}
                            <Form
                                onSubmit={onSearchSubmit}
                                className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center my-2 my-lg-0"
                                role="search"
                                style={{ minWidth: 160, maxWidth: 520 }}
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="Search products..."
                                    aria-label="Search products"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="mb-2 mb-lg-0"
                                    style={{ minWidth: 0, flex: "1 1 auto" }}
                                />
                                <div className="d-flex ms-lg-2">
                                    <Button variant="warning" type="submit" className="fw-semibold">
                                        Search
                                    </Button>
                                </div>
                            </Form>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                {/* spacer for fixed-top navbar */}
                <div style={{ height: 70 }} />

                {/* Main content area */}
                <main className="container-fluid px-3 flex-grow-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-dark text-white py-3 mt-auto">
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <p className="mb-0">© {new Date().getFullYear()} Fulkopi. All rights reserved.</p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </Fragment>
    );
};

export default MasterLayout;
