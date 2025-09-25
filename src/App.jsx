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
import CheckoutPage from "./pages/checkoutPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import {Toaster} from "react-hot-toast";
import ProductsByBrandPage from "./pages/productsByBrandPage.jsx";
import ProductsByCategoryPage from "./pages/productsByCategoryPage.jsx";
import ProductsByKeywordPage from "./pages/productsByKeywordPage.jsx";
import ProductsByRemarksPage from "./pages/productsByRemarksPage.jsx";
import {getToken} from "./helper/sessionHelper.js";
import InvoicePage from "./pages/invoicePage.jsx";
import InvoiceProductPage from "./pages/invoiceProductPage.jsx";


const App = () => {
    if(getToken()){
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/products" element={<ProductsPage/>} />
                        <Route path="/productdetails/:slug" element={<ProductDetailsPage/>} />
                        <Route path="/brands" element={<BrandsPage/>} />
                        <Route path="/categories" element={<CategoriesPage/>} />
                        <Route path="/brand/:brandID" element={<ProductsByBrandPage/>} />
                        <Route path="/category/:categoryID" element={<ProductsByCategoryPage/>} />
                        <Route path="/productbykeyword/:keyword" element={<ProductsByKeywordPage/>} />
                        <Route path="/productbyremarks/:remarks" element={<ProductsByRemarksPage/>} />

                        <Route path="/cart" element={<CartPage/>} />
                        <Route path="/wish" element={<WishPage/>} />
                        <Route path="/checkout" element={<CheckoutPage/>} />
                        <Route path="/orders" element={<InvoicePage/>}/>
                        <Route path="/invoiceproduct/:invoiceID" element={<InvoiceProductPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>} />
                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
                <Toaster/>
            </>
        );
    }else{
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/products" element={<ProductsPage/>} />
                        <Route path="/productdetails/:slug" element={<ProductDetailsPage/>} />
                        <Route path="/brands" element={<BrandsPage/>} />
                        <Route path="/categories" element={<CategoriesPage/>} />
                        <Route path="/brand/:brandID" element={<ProductsByBrandPage/>} />
                        <Route path="/category/:categoryID" element={<ProductsByCategoryPage/>} />
                        <Route path="/productbykeyword/:keyword" element={<ProductsByKeywordPage/>} />
                        <Route path="/productbyremarks/:remarks" element={<ProductsByRemarksPage/>} />

                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/registration" element={<RegisterPage/>} />
                        <Route path="/profile" element={<ProfilePage/>} />
                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
                <Toaster/>
            </>
        );
    }

};

export default App;