import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faUserTie,
    faCartFlatbed,
    faBox,
    faUser,
    faClipboardList,
    faLayerGroup
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/icon-blue.svg";

const menuItems = [
    { label: "Accueil", icon: faGauge, section: "Tableau de bord", path: "/admin/dashboard" },
    { label: "Client", icon: faUser, section: "Utilisateur", path: "/admin/customer" },
    { label: "Administrateur", icon: faUserTie, section: "Utilisateur", path: "/admin/admin" },
    { label: "Commande", icon: faCartFlatbed, section: "Produit", path: "/admin/command" },
    // { label: "Stock", icon: faBox, section: "Produit", path: "/admin/stock" },
    { label: "Inventaire", icon: faClipboardList, section: "Produit", path: "/admin/inventory" },
    { label: "Catégorie", icon: faLayerGroup, section: "Produit", path: "/admin/category" }
];

function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const handleNavigation = (index, path) => {
        setActiveIndex(index);
        navigate(path);
    };

    return (
        <div className="w-56 h-screen bg-white text-black shadow-md fixed top-0 left-0 pt-5 border-r border-gray-300">
            <div className="flex items-center justify-center mb-6">
                <img className="w-5 h-5" src={logo} alt="Logo" />
                <h2 className="ml-2 font-bold text-lg">Gestion <span className="text-blue-500">Inventaire</span></h2>
            </div>
            <hr />
            <ul className="list-none p-0">
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {index === 0 || menuItems[index - 1].section !== item.section ? (
                            <li className="py-2 px-4 font-semibold text-gray-600 text-xs">
                                {item.section}
                            </li>
                        ) : null}
                        <li
                            className={`py-3 px-4 mx-2 font-medium flex items-center cursor-pointer text-sm rounded-md transition-all duration-200 ${activeIndex === index
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-200"
                                }`}
                            onClick={() => handleNavigation(index, item.path)} // ✅ Appeler la fonction handleNavigation
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                            <span className="ml-3">{item.label}</span>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
