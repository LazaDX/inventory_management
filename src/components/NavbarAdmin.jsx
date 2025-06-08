import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
        navigate("/");
    };
    return (
        <nav className="flex justify-between items-center px-6 py-2 bg-white text-black shadow-sm border-b border-blue-200 h-[50px]">
            {/* <div className="relative flex-1 flex justify-center">
                <div className="relative w-[300px]">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full p-1 pl-10 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div> */}
            <div></div>
            <div className="flex items-center space-x-4">
                <button
                    className="px-4 py-1 bg-white text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-200"
                    onClick={handleLogout}
                >
                    Se déconnecter
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
