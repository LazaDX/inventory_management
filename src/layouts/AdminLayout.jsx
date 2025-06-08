import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";
import Navbar from "../components/NavbarAdmin";

import Dashboard from "../pages/admin/Dashboard";
import Admin from "../pages/admin/Admin";
import Command from "../pages/admin/Command";
import Customer from "../pages/admin/Customer";
import Stock from "../pages/admin/Stock";
import Category from "../pages/admin/Category";
import Inventory from "../pages/admin/Inventory";

function AdminLayout() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/command" element={<Command />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/inventory" element={<Inventory />} />
                        {/* <Route path="/stock" element={<Stock />} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;