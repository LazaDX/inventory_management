import axios from "axios";
import { useState, useEffect } from "react";
import { fetchCommands, fetchProducts, fetchClients } from "../../services/api";

function Recent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const [commandsData, clientsData, productsData] = await Promise.all([
                fetchCommands(),
                fetchClients(),
                fetchProducts(),
            ]);

            const productsMap = new Map();
            productsData.forEach((product) => {
                productsMap.set(String(product.id), product);
            });
            const clientsMap = new Map();
            clientsData.forEach((client) => {
                clientsMap.set(String(client.id), client);
            });

            const enrichedCommands = commandsData.map((command) => {
                const product = productsMap.get(String(command.productId));
                const client = clientsMap.get(String(command.userId));

                return {
                    ...command,
                    clientName: client ? `${client.firstName}` : "Inconnu",
                    productName: product ? product.name : "Inconnu",
                    price: product ? `${product.price} Ar` : "N/A",

                };
            });

            setData(enrichedCommands);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des données", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
        const interval = setInterval(() => {
            getData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="text-center p-4">Chargement...</div>;
    }
    return (
        <>
            <div className="p-3 bg-white rounded-md shadow-md " style={{ width: "40%" }} >
                <div>
                    <p className="text-sm font-semibold text-gray-500">Commande recent</p>
                    <br />
                </div>
                <div className="max-h-64 overflow-y-auto p-2 pt-3 rounded-lg scroll-container" style={{ height: "80%" }}>
                    <ul>
                        {data.slice(0, 10).map((command) => (
                            <li key={command.id} className="mb-4 border-b pb-2">
                                <p className="text-sm font-bold">{command.clientName}</p>
                                <p className="text-sm text-gray-600">{command.productName}</p>
                                <p className="text-sm text-gray-700">Prix : {command.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Recent;