import React, { useLayoutEffect} from "react";
import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Overlay from "../components/Overlay";
import Sidebar from "../components/Sidebar";
import "../css/pages/home/home.css";
import { useDispatch } from "react-redux";
import { getUserDataOnFirstLoad } from "../pages/user/UserSlice";
import { getBrandsDataOnFirstLoad } from "../pages/home/brandsSlice";
import { baseUrlApi } from "../configs/configs";
const App = () => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(getUserDataOnFirstLoad(`${baseUrlApi}checklogin.php`));
        dispatch(getBrandsDataOnFirstLoad(`${baseUrlApi}brands.php`));
    }, []);
    return (
        <div>
            <Sidebar />
            <Navbar />
            <Overlay />
            <Container>
                <Outlet />
                <Footer />
            </Container>
        </div>
    );
};

export default App;
