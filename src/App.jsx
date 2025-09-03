import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import FullScreenLoader from "./components/fullScreenLoader.jsx";

const App = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </BrowserRouter>
            <FullScreenLoader/>
        </>
    );
};

export default App;