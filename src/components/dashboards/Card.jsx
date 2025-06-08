import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpToLine, faBoxesStacked, faUser, faCartFlatbed, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import CountUp from 'react-countup';
import axios from "axios";
import { useState, useEffect } from "react";

function Card() {
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsRes, productsRes, commandsRes] = await Promise.all([
                    axios.get("http://localhost:8080/api/users/clients"),
                    axios.get("http://localhost:8080/api/products"),
                    axios.get("http://localhost:8080/api/commands"),
                ]);
                setClients(clientsRes.data);
                setProducts(productsRes.data);
                setCommands(commandsRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalClients = clients.length;
    const totalProducts = products.length;
    const totalCommands = commands.length;
    const totalStock = products.reduce((sum, product) => sum + (product.quantity || 0), 0);

    if (loading) {
        return <div>Chargement...</div>;
    }
    return (
        <>
            <div className="flex justify-between flex-wrap">
                <div className="flex-1 m-2 p-5 bg-white rounded-md shadow-md" style={{ width: '22%' }}>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-blue-400 px-2 py-1 rounded-md">
                            <FontAwesomeIcon icon={faBoxesStacked} className="text-3xl text-white " style={{ fontSize: '0.8rem' }} />
                        </div>
                        <p className="text-xs font-bold text-slate-700 ">Total du stock</p>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                        <CountUp start={20} end={totalStock} duration={3} separator=" " />
                    </p>
                    {/* <div className="flex items-center space-x-2 border border-blue-500 rounded-3xl pl-3 h-8 w-20">
                        <FontAwesomeIcon icon={faArrowsUpToLine} className="text-blue-500" style={{ fontSize: '0.75rem' }} />
                        <p className="text-xs font-bold text-blue-600 font-mono">15%</p>
                    </div> */}
                </div>
                <div className="flex-1 m-2 p-5 bg-white rounded-md shadow-md" style={{ width: '22%' }}>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-blue-400 px-2 py-1 rounded-md">
                            <FontAwesomeIcon icon={faCartFlatbed} className="text-3xl text-white " style={{ fontSize: '0.8rem' }} />
                        </div>
                        <p className="text-xs font-bold text-slate-700 ">Total du commande</p>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                        <CountUp start={1} end={totalCommands} duration={3} separator=" " />
                    </p>
                    {/* <div className="flex items-center space-x-2 border border-blue-500 rounded-3xl pl-3 h-8 w-20">
                        <FontAwesomeIcon icon={faArrowsUpToLine} className="text-blue-500" style={{ fontSize: '0.75rem' }} />
                        <p className="text-xs font-bold text-blue-600 font-mono">15%</p>
                    </div> */}
                </div>
                <div className="flex-1 m-2 p-5 bg-white rounded-md shadow-md" style={{ width: '22%' }}>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-blue-400 px-3 py-1 rounded-md">
                            <FontAwesomeIcon icon={faUser} className="text-3xl text-white " style={{ fontSize: '0.8rem' }} />
                        </div>
                        <p className="text-xs font-bold text-slate-700 ">Total du client</p>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                        <CountUp start={5} end={totalClients} duration={3} separator=" " />
                    </p>
                    {/* <div className="flex items-center space-x-2 border border-blue-500 rounded-3xl pl-3 h-8 w-20">
                        <FontAwesomeIcon icon={faArrowsUpToLine} className="text-blue-500" style={{ fontSize: '0.75rem' }} />
                        <p className="text-xs font-bold text-blue-600 font-mono">15%</p>
                    </div> */}
                </div>
                <div className="flex-1 m-2 p-5 bg-white rounded-md shadow-md" style={{ width: '22%' }}>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-blue-400 px-3 py-1 rounded-md">
                            <FontAwesomeIcon icon={faClipboardList} className="text-3xl text-white " style={{ fontSize: '0.8rem' }} />
                        </div>
                        <p className="text-xs font-bold text-slate-700 ">Total du produit</p>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                        <CountUp start={5} end={totalProducts} duration={3} separator=" " />
                    </p>
                    {/* <div className="flex items-center space-x-2 border border-blue-500 rounded-3xl pl-3 h-8 w-20 ">
                        <FontAwesomeIcon icon={faArrowsUpToLine} className="text-blue-500" style={{ fontSize: '0.75rem' }} />
                        <p className="text-xs font-bold text-blue-600 font-mono">15%</p>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Card;