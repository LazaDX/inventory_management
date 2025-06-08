import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";

function TopCommand() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            const productsData = await fetchProducts();
            setProducts(productsData);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-md shadow-md m-3" style={{ width: "60%" }}>
            <div>
                <h2 className="text-sm font-semibold text-gray-700 p-4">Top Produit</h2>
            </div>
            <div className="overflow-y-auto max-h-64 scroll-container">
                <table className="min-w-full bg-white border-gray-200 rounded-md shadow-md">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th className="py-2 px-4 border-b text-center">#</th>
                            <th className="py-2 px-4 border-b text-center">Produit</th>
                            <th className="py-2 px-4 border-b text-center">Prix</th>
                            <th className="py-2 px-4 border-b text-center">Quantité</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.slice(0, 10).map((product, index) => (
                            <tr key={product.id}>
                                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b flex items-center">
                                    <div>
                                        <h2 className="font-semibold">{product.name}</h2>
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b text-center">{product.price} Ar</td>
                                <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopCommand;
