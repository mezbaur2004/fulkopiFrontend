import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import FullScreenLoader from "./components/layout&loaders/fullScreenLoader.jsx";
import ProductsPage from "./pages/productsPage.jsx";
import ProductDetailsPage from "./pages/productDetailsPage.jsx";
import BrandsPage from "./pages/brandsPage.jsx";
import CategoriesPage from "./pages/categoriesPage.jsx";
import CartPage from "./pages/cartPage.jsx";
import WishPage from "./pages/wishPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";

const App = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/products" element={<ProductsPage/>} />
                <Route path="/productdetails" element={<ProductDetailsPage/>} />
                <Route path="/brands" element={<BrandsPage/>} />
                <Route path="/categories" element={<CategoriesPage/>} />
                <Route path="/cart" element={<CartPage/>} />
                <Route path="/wish" element={<WishPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
            </Routes>
        </BrowserRouter>
            <FullScreenLoader/>
        </>
    );
};

export default App;