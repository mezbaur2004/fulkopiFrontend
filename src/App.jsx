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
import {getToken, isAdmin} from "./helper/sessionHelper.js";
import InvoicePage from "./pages/invoicePage.jsx";
import InvoiceProductPage from "./pages/invoiceProductPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import ManageBrands from "./pages/admin/ManageBrands.jsx";
import ManageCategories from "./pages/admin/ManageCategories.jsx";
import ViewUsers from "./pages/admin/ViewUsers.jsx";
import ViewInvoices from "./pages/admin/ViewInvoices.jsx";
import UserRecord from "./pages/admin/UserRecord.jsx";
import InvoiceProductList from "./pages/admin/InvoiceProductList.jsx";
import UpdateProducts from "./pages/admin/UpdateProducts.jsx";
import UpdateBrand from "./pages/admin/UpdateBrand.jsx";
import UpdateCategory from "./pages/admin/UpdateCategory.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AdminMasterLayout from "./pages/admin/AdminMasterLayout.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import CreateBrand from "./pages/admin/CreateBrand.jsx";
import CreateCategory from "./pages/admin/CreateCategory.jsx";


const App = () => {
    if (getToken() && isAdmin()) {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/products" element={<ProductsPage/>}/>
                        <Route path="/productdetails/:slug" element={<ProductDetailsPage/>}/>
                        <Route path="/brands" element={<BrandsPage/>}/>
                        <Route path="/categories" element={<CategoriesPage/>}/>
                        <Route path="/brand/:slug" element={<ProductsByBrandPage/>}/>
                        <Route path="/category/:slug" element={<ProductsByCategoryPage/>}/>
                        <Route path="/productbykeyword/:keyword" element={<ProductsByKeywordPage/>}/>
                        <Route path="/productbyremarks/:remarks" element={<ProductsByRemarksPage/>}/>


                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/wish" element={<WishPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                        <Route path="/orders" element={<InvoicePage/>}/>
                        <Route path="/invoiceproduct/:invoiceID" element={<InvoiceProductPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>


                        <Route path="/admin" element={<AdminPage/>}/>

                        <Route path="/admin/products" element={<ManageProducts/>}/>
                        <Route path="/admin/createproduct" element={<CreateProduct/>}/>
                        <Route path="/admin/products/update/:id" element={<UpdateProducts/>}/>

                        <Route path="/admin/brands" element={<ManageBrands/>}/>
                        <Route path="/admin/createbrand" element={<CreateBrand/>}/>
                        <Route path="/admin/brands/update/:id" element={<UpdateBrand/>}/>

                        <Route path="/admin/categories" element={<ManageCategories/>}/>
                        <Route path="/admin/createcategory" element={<CreateCategory/>}/>
                        <Route path="/admin/categories/update/:id" element={<UpdateCategory/>}/>

                        <Route path="/admin/userlist" element={<ViewUsers/>}/>
                        <Route path="/admin/userlist/invoicelist/:id" element={<UserRecord/>}/>
                        <Route path="/admin/userlist/invoicelist/invoiceproductlist/:id" element={<InvoiceProductList/>}/>
                        <Route path="/admin/invoicelist" element={<ViewInvoices/>}/>
                        <Route path="/admin/invoicelist/invoiceproductlist/:id" element={<InvoiceProductList/>}/>
                        <Route path="/admin/master" element={<AdminMasterLayout/>}/>
                        <Route path="*" element={<ErrorPage/>}/>

                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
                <Toaster/>
            </>
        );
    } else if (getToken()) {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/products" element={<ProductsPage/>}/>
                        <Route path="/productdetails/:slug" element={<ProductDetailsPage/>}/>
                        <Route path="/brands" element={<BrandsPage/>}/>
                        <Route path="/categories" element={<CategoriesPage/>}/>
                        <Route path="/brand/:slug" element={<ProductsByBrandPage/>}/>
                        <Route path="/category/:slug" element={<ProductsByCategoryPage/>}/>
                        <Route path="/productbykeyword/:keyword" element={<ProductsByKeywordPage/>}/>
                        <Route path="/productbyremarks/:remarks" element={<ProductsByRemarksPage/>}/>

                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/wish" element={<WishPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                        <Route path="/orders" element={<InvoicePage/>}/>
                        <Route path="/invoiceproduct/:invoiceID" element={<InvoiceProductPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>

                        <Route path="*" element={<ErrorPage/>}/>

                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
                <Toaster/>
            </>
        );
    } else {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/products" element={<ProductsPage/>}/>
                        <Route path="/productdetails/:slug" element={<ProductDetailsPage/>}/>
                        <Route path="/brands" element={<BrandsPage/>}/>
                        <Route path="/categories" element={<CategoriesPage/>}/>
                        <Route path="/brand/:slug" element={<ProductsByBrandPage/>}/>
                        <Route path="/category/:slug" element={<ProductsByCategoryPage/>}/>
                        <Route path="/productbykeyword/:keyword" element={<ProductsByKeywordPage/>}/>
                        <Route path="/productbyremarks/:remarks" element={<ProductsByRemarksPage/>}/>

                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/registration" element={<RegisterPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>

                        <Route path="*" element={<ErrorPage/>}/>

                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
                <Toaster/>
            </>
        );
    }

};

export default App;