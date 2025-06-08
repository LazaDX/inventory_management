import { Routes, Route, Navigate } from "react-router-dom";
import SidebarCustomer from "../components/SidebarCustomer";
import Navbar from "../components/NavbarAdmin";

import Profile from "../pages/customer/Profil";
import ProducList from "../pages/customer/ProductList";
import Orders from "../pages/customer/Orders";


function ClientLayout() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {

        return <Navigate to="/login" />;
    }
    return (
        <div className="flex h-screen">
            <SidebarCustomer />
            <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Navigate to="product" />} />
                        <Route path="/profil" element={<Profile />} />
                        <Route path="/product" element={<ProducList />} />
                        <Route path="/order" element={<Orders />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default ClientLayout;