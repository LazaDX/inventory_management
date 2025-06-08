import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Navbar() {

    return (
        <>
            <nav className="flex justify-between items-center px-6 py-3 bg-white text-black shadow-sm border-b border-blue-200">
                {/* Logo & Titre */}
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faChartBar} className="text-blue-500 text-2xl" />
                    <h1 className="text-lg font-bold">
                        <span className="text-black">Gestion</span>{" "}
                        <span className="text-blue-500">Inventaire</span>
                    </h1>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                        S'inscrire
                    </button>
                    {/* <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                    Se connecter
                </button> */}

                </div>
            </nav>
        </>

    );
}

export default Navbar;
