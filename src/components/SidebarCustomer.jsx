import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faBoxesPacking,
    faShop,

} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/icon-blue.svg";

const menuItems = [
    { label: "Profil", icon: faAddressCard, section: "A propos", path: "/client/profil" },
    { label: "Produit", icon: faBoxesPacking, section: "Manipulation", path: "/client/product" },
    { label: "Commande", icon: faShop, section: "Manipulation", path: "/client/order" },
];

function SidebarCustomer() {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (index, path) => {
        setActiveIndex(index);
        navigate(path);
    };

    return (
        <div className="w-56 h-screen bg-white text-black shadow-md fixed top-0 left-0 pt-5 border-r border-gray-300">
            <div className="flex items-center justify-center mb-8">
                <img className="w-5 h-5" src={logo} alt="Logo" />
                <h2 className="ml-2 font-bold text-lg">Portail <span className="text-blue-500">Client</span></h2>
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
                            onClick={() => handleNavigation(index, item.path)}
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

export default SidebarCustomer;
