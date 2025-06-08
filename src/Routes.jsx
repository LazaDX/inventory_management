import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import Register from "./auth/Register";

function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? children : <Navigate to="/" />;

}

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={<PrivateRoute><AdminLayout /></PrivateRoute>} />
                <Route path="/client/*" element={<PrivateRoute><ClientLayout /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;